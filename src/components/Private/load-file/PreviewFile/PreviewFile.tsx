"use client"
import styles from './PreviewFile.module.scss';
import Papa, { ParseResult } from 'papaparse';
import { useState, ChangeEvent } from 'react';
import { UploadFileInput } from '../UploadFileInput';
import { Datatable } from '../DataTable';

interface CSVRow {
    [key: string]: string | number | boolean | null;
};

const title = "Vista previa del archivo";
  
export const PreviewFile = () =>{
    const [parsedData, setParsedData] = useState<CSVRow[]>([]);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'text/csv') {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: (results: ParseResult<CSVRow>) => {
                    setParsedData(results.data);
                },
            });
        }
    };
    
    return(
        <>
            <UploadFileInput onChange={handleFileUpload}/>

            {parsedData.length > 0 && (
                <div className={styles.PreviewContainer}>
                    <h2 className={styles.PreviewContainer__Subtitle}>{title}</h2>
                    <Datatable data={parsedData}/>                    
                </div>
            )}
        </>
    )
}