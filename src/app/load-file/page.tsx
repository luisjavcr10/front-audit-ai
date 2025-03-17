import styles from './page.module.scss';
import { PreviewFile } from '@/components/Private/load-file/PreviewFile';

const title = "AuditAI - Smart Auditing with AI";
const subtitle = "Upload your files (CSV, Excel, PDF) and let AI audit them for you. Fast and accurate!";

export default function LoadFile() {

    return (
        <div className={styles.page}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <PreviewFile/>
        </div>
    );
}
