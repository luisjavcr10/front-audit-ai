/**
 * Servicio para manejar las llamadas al backend
 */

// URL base del backend
const API_BASE_URL = "https://backend-audit-ai.onrender.com";

// Define an interface for the row data
interface CSVRow {
  [key: string]: string | number | boolean | null;
}

/**
 * Sube un archivo al backend y lo convierte a JSON
 * @param fileBlob Blob del archivo a subir
 * @param fileName Nombre del archivo
 * @param fileType Tipo de archivo (por defecto 'csv')
 * @returns Promise con los datos convertidos a JSON
 */
export const uploadFileToBackend = async (
  fileBlob: Blob, 
  fileName: string, 
  fileType: string = "csv"
): Promise<CSVRow[]> => {
  const formData = new FormData();
  formData.append("file", fileBlob, fileName);
  formData.append("type", fileType);

  try {
    console.log("FormData being sent:", formData);
    const res = await fetch(`${API_BASE_URL}/convertToJson`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Error al subir el archivo");
    }

    const data = await res.json();
    console.log("Respuesta del backend:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};