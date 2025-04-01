import styles from './page.module.scss';

export default function ConfigAuditLayout({children}: {children: React.ReactNode}) {
    return (
        <div className={styles.page}>
            <h1 className={styles.page__title}>Config Audit</h1>
            {children}
        </div>
    );
}