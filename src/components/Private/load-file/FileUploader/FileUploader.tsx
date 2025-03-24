"use client"
import { ChangeEvent, useState } from 'react';
import { uploadFileFromLocalToBackend } from '@/services/apiService';
import { ButtonsSection } from '../ButtonsSection';
import { Datatable } from '../DataTable';
import { GoogleDriveIntegration } from '../GoogleDriveIntegration/GoogleDriveIntegration';
import { UploadFileInput } from '../UploadFileInput';
import styles from './FileUploader.module.scss';

interface CSVRow {
    [key: string]: string | number | boolean | null;
};
  
export const FileUploader = () =>{
    const [parsedData, setParsedData] = useState<CSVRow[] | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleModelSelect = (model: string) => {
        setSelectedModel(model);
    };

    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
    }

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
          setParsedData(data);
        },
    });

    const sendRequest = () => {
        if (!parsedData || !selectedModel || !selectedType) {
            alert("Por favor, completa todos los campos antes de enviar la solicitud.");
            return;
        }
        alert("Solicitud enviada con éxito.");
    }

    return(
        <>
            <UploadFileInput onChangeLocal={handleUploadLocalFile} googleDrive={handleUploadGoogleDriveFile}/>
            
            <div className={styles.FileUploader}>
                <Datatable data={parsedData}/>  
                <ButtonsSection 
                    model={selectedModel}
                    type={selectedType}
                    handleModel={handleModelSelect} 
                    handleType={handleTypeSelect}
                    handleSendRequest={sendRequest}
                />        
            </div>            
        </>
    )
}