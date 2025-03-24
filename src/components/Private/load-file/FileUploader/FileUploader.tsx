"use client"
import styles from './FileUploader.module.scss';
import { useState, ChangeEvent } from 'react';
import { UploadFileInput } from '../UploadFileInput';
import { Datatable } from '../DataTable';
import { uploadFileFromLocalToBackend } from '@/services/apiService';
import { ModelIcon } from '@/utils/ModelIcon';
import { TypeIcon } from '@/utils/TypeIcon';

import { FeatureButton } from '../FeatureButton';

import { GoogleDriveIntegration } from '../GoogleDriveIntegration/GoogleDriveIntegration';

interface CSVRow {
    [key: string]: string | number | boolean | null;
};
  
export const FileUploader = () =>{
    const [parsedData, setParsedData] = useState<CSVRow[]>([]);

    const handleUploadLocalFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            alert("Por favor selecciona un archivo.");
            return;
        }
        
        try {
            const data = await uploadFileFromLocalToBackend(file);
            setParsedData(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al subir el archivo.");
        }
    };

    const { handleUploadGoogleDriveFile } = GoogleDriveIntegration({
        onFileLoaded: (data) => {
          console.log("Datos recibidos desde el backend:", data);
        },
    });

    return(
        <>
            <UploadFileInput onChangeLocal={handleUploadLocalFile} googleDrive={handleUploadGoogleDriveFile}/>
            
            <div className={styles.FileUploader}>
                <Datatable data={parsedData}/>     
                <div className={styles.FileUploader__ButtonsSection}>
                    <div className={styles.FileUploader__ButtonsSection__FeatureButtons}>
                        <FeatureButton type='Model'> 
                            <ModelIcon/>
                        </FeatureButton>    
                        <FeatureButton type='Type'> 
                            <TypeIcon/>
                        </FeatureButton> 
                    </div>
                    <div className={styles.FileUploader__StartButton}>
                        Audit with AI
                    </div>
                </div>            
            </div>            
        </>
    )
}