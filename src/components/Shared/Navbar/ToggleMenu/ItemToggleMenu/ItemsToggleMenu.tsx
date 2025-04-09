import styles from '../../Navbar.module.scss';

export const ItemToggleMenu = ({icon, title, href}: 
    Readonly<{icon: React.ReactNode, title:string, href: string}>) =>{
    return(
        <a href={href} className={styles.ToggleMenu__Item}>
            {icon}
            <p 
                className={styles.ToggleMenu__Item__Title}
            >
                {title}
            </p>
        </a>
    )
}