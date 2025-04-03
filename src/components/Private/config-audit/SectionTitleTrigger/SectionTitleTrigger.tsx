import styles from './SectionTitleTrigger.module.scss';

export const SectionTitleTrigger = ({children,titleText}: Readonly<{children: React.ReactNode; titleText:string}>) => {
    return(
        <div className={styles.SectionTitle}>
            {children}
            {titleText}
        </div>
    )
}