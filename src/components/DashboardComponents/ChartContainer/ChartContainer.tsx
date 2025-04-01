import styles from './ChartContainer.module.scss';

export const ChartContainer = ({children}: Readonly<{children: React.ReactNode}>) =>{
    return(
        <div className={styles.ChartContainer}>
            {children}
        </div>
    )
}