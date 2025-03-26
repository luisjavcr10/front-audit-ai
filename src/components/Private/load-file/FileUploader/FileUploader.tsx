"use client"

import { ChangeEvent, useState } from 'react';
import { ErrorToast } from '@/components/Shared/ErrorToast';
import { Loader } from '@/components/Shared/Loader';
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleIsLoading = (value: boolean) => {
        setIsLoading(value);
    }

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
            setIsLoading(true);
            const data = await uploadFileFromLocalToBackend(file);
            setIsLoading(false);
            setParsedData(data);
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al subir el archivo.");
        }
    };

    const { handleUploadGoogleDriveFile } = GoogleDriveIntegration({
        onFileLoaded: (data) => {
          setParsedData(data);
        }, handleLoading: handleIsLoading
    });

    const handleError = (error: string) => {
        setError(error);
    }

    const sendRequest = () => {
        const validationErrors = {
            file: !parsedData && 'Select a file',
            model: !selectedModel && 'Select an AI model', 
            type: !selectedType && 'Select an audit type'
        };

        const error = Object.values(validationErrors).find(Boolean);
        
        if (error) {
            handleError(error);
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

            {isLoading && <div className={styles.Loader}><Loader/></div>}

            {error && <ErrorToast errorMessage={error} onClose={()=>setError(null)}/>  }
        </>
    )
}