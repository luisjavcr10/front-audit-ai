"use client"
import { useState, useEffect } from 'react';
import { loadGoogleIdentityServices, authenticateGoogle, loadGooglePickerAPI, showGooglePicker, downloadFileFromDrive } from '@/services/googleDriveService';
import { WindowWithGoogleAPIs } from '@/types/google-api';
import { uploadFileFromGoogleDriveToBackend } from '@/services/apiService';

interface CSVRow {
  [key: string]: string | number | boolean | null;
}

interface GoogleDriveIntegrationProps {
  onFileLoaded: (data: CSVRow[]) => void;
}

export const GoogleDriveIntegration = ({ onFileLoaded }: GoogleDriveIntegrationProps) => {
  const [gisLoaded, setGisLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const loadGis = async () => {
      await loadGoogleIdentityServices();
      setGisLoaded(true);
    };

    loadGis();
  }, []);

  const authenticate = async () => {
    if (!gisLoaded) return console.error("Google Identity Services aún no está listo");
    try {
      const token = await authenticateGoogle();
      setAccessToken(token);
      // Iniciar el Google Picker inmediatamente después de obtener el token
      loadAndShowPicker(token);
      return token;
    } catch (error) {
      console.error("Error durante la autenticación:", error);
      return null;
    }
  };

  const loadAndShowPicker = async (token: string) => {
    await loadGooglePickerAPI();
    showGooglePicker(token, async (data) => {
      if (data.action === ((window as unknown) as WindowWithGoogleAPIs).google.picker.Action.PICKED) {
        const file = data.docs[0];
        try {
          const fileBlob = await downloadFileFromDrive(file.id, token);
          console.log("Archivo descargado:", fileBlob);
          const jsonData = await uploadFileFromGoogleDriveToBackend(fileBlob, file.name);
          onFileLoaded(jsonData);
        } catch (error) {
          console.error("Error al manejar el archivo:", error);
          alert("Hubo un problema al manejar el archivo.");
        }
      }
    });
  };

  const handleUploadGoogleDriveFile = async () => {
    //Obtenemos token de acceso, luego de la autentificación
    const token = accessToken || (await authenticate());
    if (!token) {
      return console.log("No se pudo obtener el token de Google Drive aun");
    }
    // Usamos el servicio para mostrar el selector de archivos
    await loadAndShowPicker(token);
  };

  return {
    handleUploadGoogleDriveFile
  };
};