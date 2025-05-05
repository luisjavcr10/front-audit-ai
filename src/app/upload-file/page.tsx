"use client"
import styles from './page.module.scss';
import { FileUploader } from '@/components/Private/upload-file/FileUploader';

const pageContent = {
    title: "AuditAI - Smart Auditing with AI",
    subtitle: "Upload your files (CSV, Excel, Numbers) and let AI audit them for you. Fast and accurate!"
};

export default function LoadFile() {

    return (
        <main className={styles.page}>
            <h1 className={styles.page__Title}>{pageContent.title}</h1>
            <p className={styles.page__Subtitle}>{pageContent.subtitle}</p>
            <FileUploader/>
        </main>
    );
}
