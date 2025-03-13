"use client"

import styles from './UploadFileInput.module.scss';

export const UploadFileInput = ({onChange}: Readonly<{onChange:React.ChangeEventHandler}>) =>{
    return(
        <div className={styles.UploadFileInput}>
            <input 
                type="file" 
                id="file-upload" 
                accept=".csv" 
                onChange={onChange}
            />

            <label htmlFor="file-upload" className={styles["custom-file-upload"]}>
                Subir archivo
            </label>

        </div>
    )
}