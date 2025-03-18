import styles from '../../Navbar.module.scss';

export const ItemToggleMenu = ({icon, title, href}: 
    Readonly<{icon: React.ReactNode, title:string, href: string}>) =>{
    return(
        <div className={styles.ToggleMenu__Item}>
            {icon}
            {/*<div className={styles.ToggleMenu__Item__Icon}>
                {icon}
            </div>*/}
            <a 
                className={styles.ToggleMenu__Item__Title}
                href={href}
            >
                {title}
            </a>
        </div>
    )
}