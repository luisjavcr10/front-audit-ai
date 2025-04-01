/**
 * Servicio para manejar las llamadas al backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface CSVRow {
  [key: string]: string | number | boolean | null;
}

interface BodyToGetRegulations{
  sector: string;
  typeaudit:string;
}

interface BodyToGetListOfRules{
  sector: string;
  typeaudit:string;
  cabeceras: string[];
  normativas: string[];
}

export const uploadFileFromGoogleDriveToBackend = async (
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

export const uploadFileFromLocalToBackend = async (
  file: File,
  fileType: string = "csv"
): Promise<CSVRow[]> => {
  if (!file) {
    throw new Error("No file provided");
  }

  const formData = new FormData();
  formData.append("file", file);
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

export const getListOfRegulations = async (
  body: BodyToGetRegulations
): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data.recommendedRules;  
  } catch (error) {
    console.error('Error:', error);
    return [];  
  }
};

export const getListOfRules = async (
  body: BodyToGetListOfRules
): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/getRules`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contextAuditDto: {
          sector: body.sector,
          typeaudit: body.typeaudit,
          normativas: body.normativas,
          metadata:{
              headCsv: body.cabeceras,
          }
        },
        configIADto:{
          detailLevel: "Alto",
          language: "Español",
        }          
      }),
    });

    const data = await response.json();
    return data.rules;  
  } catch (error) {
    console.error('Error:', error);
    return [];  
  }
};