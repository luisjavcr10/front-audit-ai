import styles from './DashboardContainer.module.scss';

export const DashboardContainer = ({children}: Readonly<{children: React.ReactNode}>) =>{
    return(
        <div className={styles.DashboardContainer}>
            {children}
        </div>
    )
}