import styles from './page.module.scss';
import { FileUploader } from '@/components/Private/load-file/FileUploader';

const title = "AuditAI - Smart Auditing with AI";
const subtitle = "Upload your files (CSV, Excel, Numbers) and let AI audit them for you. Fast and accurate!";

export default function LoadFile() {

    return (
        <main className={styles.page}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <FileUploader/>
        </main>
    );
}
