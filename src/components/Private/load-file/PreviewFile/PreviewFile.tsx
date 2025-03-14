"use client"
import styles from './PreviewFile.module.scss';
import { useState, ChangeEvent } from 'react';
import { UploadFileInput } from '../UploadFileInput';
import { Datatable } from '../DataTable';

interface CSVRow {
    [key: string]: string | number | boolean | null;
};

const title = "Vista previa del archivo";
  
export const PreviewFile = () =>{
    const [parsedData, setParsedData] = useState<CSVRow[]>([]);

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

    return(
        <>
            <UploadFileInput onChange={handleUpload}/>

            {parsedData.length > 0 && (
                <div className={styles.PreviewContainer}>
                    <h2 className={styles.PreviewContainer__Subtitle}>{title}</h2>
                    <Datatable data={parsedData}/>                    
                </div>
            )}
        </>
    )
}