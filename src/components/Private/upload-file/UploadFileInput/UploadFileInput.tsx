"use client";
import styles from "./UploadFileInput.module.scss";
import { FaGoogleDrive } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export const UploadFileInput = ({ 
    onChangeLocal, googleDrive 
}: Readonly<{ 
    onChangeLocal: React.ChangeEventHandler; googleDrive: () => void 
}>) => {
    const {isAuthenticated} = useAuth();

    return (
        <div className={styles.UploadFileInput}>
            <div className={styles.UploadFileInput__ButtonsSection}>
                <input type="file" id="file-upload" accept=".csv" onChange={onChangeLocal} />

                <label 
                    htmlFor="file-upload" 
                    className={`${styles["custom-file-upload"]} ${!isAuthenticated? styles.UploadFileInput__Hide:''}`}>
                    Select file 
                    <p className={styles.UploadFileInput__Types}>
                        (CSV, Excel, Numbers)
                    </p>
                </label>

                <button 
                    aria-label="api-google-drive" 
                    onClick={googleDrive} 
                    className={`${styles.UploadFileInput__ButtonsSection__DriveButton} ${!isAuthenticated? styles.UploadFileInput__Hide:''}`}>
                    <FaGoogleDrive className={styles.UploadFileInput__ButtonsSection__DriveButton__Icon}/>
                </button>
            </div>
        </div>
    );
};