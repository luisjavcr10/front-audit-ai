"use client"
import styles from './PreviewFile.module.scss';
import Link from 'next/link';
import { useState, ChangeEvent, useEffect } from 'react';
import { UploadFileInput } from '../UploadFileInput';
import { Datatable } from '../DataTable';
import { loadGoogleIdentityServices, authenticateGoogle, loadGooglePickerAPI, showGooglePicker, downloadFileFromDrive } from '../../../../services/googleDriveService';
import { WindowWithGoogleAPIs } from '../../../../types/google-api';
import { uploadFileToBackend } from '../../../../services/apiService';

interface CSVRow {
    [key: string]: string | number | boolean | null;
};

const title = "Vista previa del archivo";
  
export const PreviewFile = () =>{
    const [parsedData, setParsedData] = useState<CSVRow[]>([]);
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
                //Seleccionamos el primer archivo
                const file = data.docs[0];
                try {
                    const fileBlob = await downloadFileFromDrive(file.id, token);
                    console.log("Archivo descargado:", fileBlob);
                    // Enviar el archivo al backend
                    const jsonData = await uploadFileToBackend(fileBlob, file.name);
                    setParsedData(jsonData);
                } catch (error) {
                    console.error("Error al manejar el archivo:", error);
                    alert("Hubo un problema al manejar el archivo.");
                }
            }
        });
    };

    const handleGoogleDriveClick = async () => {
        //Obtenemos token de acceso, luego de la autentificación
        const token = accessToken || (await authenticate());
        if (!token) {
            return console.log("No se pudo obtener el token de Google Drive aun");
        }
        // Usamos el servicio para mostrar el selector de archivos
        await loadAndShowPicker(token);
    };

    const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const type= "csv"
        if (!file) {
            alert("Por favor selecciona un archivo.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        try {
            console.log('FormData being sent:', formData);
            const res = await fetch(`https://backend-audit-ai.onrender.com/convertToJson`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Error al subir el archivo");

            const data = await res.json();
            setParsedData(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al subir el archivo.");
        }
    };

    //const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    //    const file = event.target.files?.[0];
    //    const type = "csv"
    //    if (!file) {
    //        alert("Por favor selecciona un archivo.");
    //        return;
    //    }
    //    try {
    //        const data = await uploadFileToBackend(file, file.name, type);
    //        setParsedData(data);
    //    } catch (error) {
    //        console.error("Error:", error);
    //        alert("Hubo un problema al subir el archivo.");
    //    }
    //};

    return(
        <>
            <UploadFileInput onChangeLocal={handleUpload} googleDrive={handleGoogleDriveClick}/>

            {parsedData.length > 0 && (
                <div className={styles.PreviewContainer}>
                    <Datatable data={parsedData}/>    
                    <Link 
                        href='/prompt'
                        onClick={() => {
                            localStorage.setItem('parsedData', JSON.stringify(parsedData));
                        }}
                    >
                        Enviar datos a análisis
                    </Link>                
                </div>
                
            )}
        </>
    )
}