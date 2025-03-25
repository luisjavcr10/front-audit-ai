import styles from "./UploadFileInput.module.scss";
import { FaGoogleDrive } from "react-icons/fa";

export const UploadFileInput = ({ onChangeLocal, googleDrive }: Readonly<{ onChangeLocal: React.ChangeEventHandler; googleDrive: () => void }>) => {
    return (
        <div className={styles.UploadFileInput}>
            <div className={styles.UploadFileInput__ButtonsSection}>
                <input type="file" id="file-upload" accept=".csv" onChange={onChangeLocal} />

                <label htmlFor="file-upload" className={styles["custom-file-upload"]}>
                    Select file <label className={styles.UploadFileInput__Types}>(CSV, Excel, Numbers)</label>
                </label>

                <button aria-label="api-google-drive" onClick={googleDrive} className={styles.UploadFileInput__ButtonsSection__DriveButton}>
                    <FaGoogleDrive className={styles.UploadFileInput__ButtonsSection__DriveButton__Icon}/>
                </button>
            </div>
        </div>
    );
};