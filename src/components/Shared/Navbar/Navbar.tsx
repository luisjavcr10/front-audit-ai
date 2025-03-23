"use client";
import { usePathname } from "next/navigation";
import styles from './Navbar.module.scss';
import { Logotipo } from './Logotipo';
import { Links } from './Links';
import { Buttons } from './Buttons';
import { ToggleMenu } from './ToggleMenu';

export const Navbar = () =>{
    const pathname = usePathname();

    if (pathname === "/login" || pathname === "/register" ) return null;

    return(
        <nav className={styles.Navbar}>
            {/**Seccion del logotipo y enlaces */}
            <div className={styles.Navbar__LeftSection}>
                <Logotipo/>
                <Links/>
            </div>
            
            {/**Seccion de botones para cambio de tema o idioma y login */}
            <div className={styles.Navbar__RightSection}>
                <Buttons/>
            </div>

            {/**Menu para dispositivos mobiles */}
            <ToggleMenu/>
            
        </nav>
    );
};