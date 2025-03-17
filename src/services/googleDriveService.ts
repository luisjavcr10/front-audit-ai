/**
 * Servicio para manejar la integración con Google Drive
 */

import { GooglePickerResponse, TokenResponse, WindowWithGoogleAPIs } from '../types/google-api';

// Local interfaces are now imported from types/google-api.ts

/**
 * Carga el script de Google Identity Services
 * @returns Promise que se resuelve cuando el script está cargado
 */
export const loadGoogleIdentityServices = (): Promise<void> => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      resolve();
    };
    document.body.appendChild(script);
  });
};

/**
 * Autentica con Google y obtiene un token de acceso
 * @returns Promise con el token de acceso
 */
export const authenticateGoogle = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Inicializar el flujo de autenticación con GIS
      const tokenClient = ((window as unknown) as WindowWithGoogleAPIs).google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.readonly",
        callback: (response: TokenResponse) => {
          if (response.access_token) {
            console.log("Token de acceso obtenido:", response.access_token);
            resolve(response.access_token);
          } else {
            const error = new Error("No se pudo obtener el token de acceso");
            console.error(error);
            reject(error);
          }
        },
      });

      // Solicitar el token de acceso
      tokenClient.requestAccessToken();
    } catch (error) {
      console.error("Error durante la autenticación:", error);
      reject(error);
    }
  });
};

/**
 * Carga el script de Google Picker API
 * @returns Promise que se resuelve cuando el script está cargado
 */
export const loadGooglePickerAPI = (): Promise<void> => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://apis.google.com/js/api.js"]')) {
      resolve();
      return;
    }

    const pickerScript = document.createElement("script");
    pickerScript.src = "https://apis.google.com/js/api.js";
    pickerScript.onload = () => {
      ((window as unknown) as WindowWithGoogleAPIs).gapi.load("picker", () => {
        resolve();
      });
    };
    document.body.appendChild(pickerScript);
  });
};

/**
 * Muestra el selector de archivos de Google Drive
 * @param token Token de acceso de Google
 * @param callback Función a ejecutar cuando se selecciona un archivo
 */
export const showGooglePicker = (token: string, callback: (response: GooglePickerResponse) => void): void => {
  const googleWindow = ((window as unknown) as WindowWithGoogleAPIs);
  const picker = new googleWindow.google.picker.PickerBuilder()
    .addView(googleWindow.google.picker.ViewId.DOCS)
    .setOAuthToken(token)
    .setDeveloperKey(process.env.NEXT_PUBLIC_DEVELOP_KEY)
    .setCallback((data: GooglePickerResponse) => callback(data))
    .build();

  picker.setVisible(true);
};

/**
 * Descarga un archivo desde Google Drive
 * @param fileId ID del archivo en Google Drive
 * @param token Token de acceso de Google
 * @returns Promise con el blob del archivo
 */
export const downloadFileFromDrive = async (fileId: string, token: string): Promise<Blob> => {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al descargar el archivo");
  }

  return await response.blob();
};