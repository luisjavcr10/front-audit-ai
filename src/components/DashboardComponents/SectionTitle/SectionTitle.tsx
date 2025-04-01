import styles from './SectionTitle.module.scss';

export const SectionTitle = ({message}:Readonly<{message: string}>) => {
    return(
        <h2 className={styles.SectionTitle}>
            {message}
        </h2>
    )
}