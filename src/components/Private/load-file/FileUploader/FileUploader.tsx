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

import { useCSVContext } from '@/context/CSVContext';
  
export const FileUploader = () =>{
    const {CSVdata,toggleCSV} = useCSVContext();

    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleIsLoading = (value: boolean) => {
        setIsLoading(value);
    }

    const handleModelSelect = (model: string) => {
        setSelectedModel(model);
    };

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
            toggleCSV(data);
        } catch (error) {
            console.error("Error:", error);
            setError("Error al cargar el archivo.");
            setIsLoading(false);
        }
    };

    const { handleUploadGoogleDriveFile } = GoogleDriveIntegration({
        onFileLoaded: (data) => {
            toggleCSV(data);
        }, handleLoading: handleIsLoading
    });

    const goToConfigAudit = () => {
        if(!selectedModel){
            setError("Please select an AI Model");
            return;
        }
        if(!CSVdata){
            setError("Please load a file");
            return;
        }
        window.location.href = '/config-audit';
    };

    return(
        <>
            <UploadFileInput onChangeLocal={handleUploadLocalFile} googleDrive={handleUploadGoogleDriveFile}/>
            
            <div className={styles.FileUploader}>
                <Datatable/>  
                <ButtonsSection 
                    model={selectedModel}
                    handleModel={handleModelSelect} 
                    handleRedirect={goToConfigAudit}
                />        
            </div> 

            {isLoading && <Loader/>}

            {error && <ErrorToast errorMessage={error} onClose={()=>setError(null)}/>  }
        </>
    )
}