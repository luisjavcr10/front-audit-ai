import styles from './ChartDescription.module.scss';

export const ChartDescription = ({text}: Readonly<{text: string}>) =>{
    return(
        <p className={styles.ChartDescription}>{text}</p>
    )
}