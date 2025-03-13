"use client"
import styles from './PreviewFile.module.scss';
import Papa, { ParseResult } from 'papaparse';
import { useState, ChangeEvent } from 'react';
import { UploadFileInput } from '../UploadFileInput';

interface CSVRow {
    [key: string]: string | number | boolean | null;
}
  

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
                    <h2 className={styles.PreviewContainer__Subtitle}>Preview del archivo</h2>
                    <div className={styles.TableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(parsedData[0]).map((header) => (
                                        <th key={header}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {parsedData.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, i) => (
                                            <td key={i}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            )}
        </>
    )
}