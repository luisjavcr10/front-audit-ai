"use client"
import styles from './page.module.scss';
import Papa, { ParseResult } from 'papaparse';
import { useState, ChangeEvent } from 'react';

interface CSVRow {
  [key: string]: string | number | boolean | null;
}

export default function LoadFile() {
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

    return (
        <div className={styles.page}>
            <h1>Carga tu CSV</h1>

            <input 
                type="file" 
                id="file-upload" 
                accept=".csv" 
                onChange={handleFileUpload}
            />

            <label htmlFor="file-upload" className={styles["custom-file-upload"]}>
                Subir archivo
            </label>

            {parsedData.length > 0 && (
                <div className={styles.page__PreviewContainer}>
                    <h2 className={styles.page__PreviewContainer__Subtitle}>Preview del archivo</h2>
                    <div className={styles.page__TableContainer}>
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
        </div>
    );
}
