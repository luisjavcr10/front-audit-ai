import styles from "./UploadFileInput.module.scss";
import { FaGoogleDrive } from "react-icons/fa";

export const UploadFileInput = ({ onChangeLocal, googleDrive }: Readonly<{ onChangeLocal: React.ChangeEventHandler; googleDrive: () => void }>) => {
    return (
        <div className={styles.UploadFileInput}>
            <input type="file" id="file-upload" accept=".csv" onChange={onChangeLocal} />

            <label htmlFor="file-upload" className={styles["custom-file-upload"]}>
                Subir archivo
            </label>

            <button onClick={googleDrive} className={styles.UploadFileInput__DriveButton}>
                <FaGoogleDrive />
            </button>
        </div>
    );
};