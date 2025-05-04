const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://app-auditai-backend-01-hshxcng8hjbxe7dg.centralus-01.azurewebsites.net/";
import { CSVRow } from "@/types/CSVRow";
import { BodyToGetDashboard } from "@/types/ApiTypes";
import { BodyToGetListOfRules } from "@/types/ApiTypes";
import { BodyToGetRegulations } from "@/types/ApiTypes";
import { Rule } from "@/types/Rule";
import { DataResponseDashboard } from "@/types/ApiTypes";


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
): Promise<Rule[]> => {
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

export const getDashboard = async (
  body: BodyToGetDashboard
): Promise<DataResponseDashboard> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analysis`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auditType: body.typeaudit,
        sector: body.sector,
        regulations:body.regulations,
        rules:body.rules,
        csvData: body.CSVdata
      }),
    });

    const data = await response.json();
    return data;  
  } catch (error) {
    console.error('Error:', error);
    return {auditResponseDtoList:[]};  
  }
};

interface UserBody {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const register = async (
  user: UserBody
): Promise<void> =>{
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export const login = async (
  user: UserBody
): Promise<LoginResponse> =>{
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return {token:""};
  }
}