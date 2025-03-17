import styles from './Navbar.module.scss';
import Link from 'next/link';
import { MdOutlineTranslate, MdOutlineLightMode } from "react-icons/md";

export const Navbar = () =>{
    return(
        <nav className={styles.Navbar}>
            <div className={styles.Navbar__LinksContainer}>
                <div className={styles.Navbar__ImgContainer}>
                    <img src="/images/logo.jpg" alt="logotipo" />
                </div>
                <ul>
                    <Link className={styles.Navbar__Link} href="">Home</Link>
                    <Link className={styles.Navbar__Link} href="">Load</Link>
                    <Link className={styles.Navbar__Link} href="">Stats</Link>
                </ul>
            </div>
            
            <div className={styles.Navbar__ButtonsSection}>
                <MdOutlineLightMode className={styles.Navbar__ButtonsSection__Icon}/>
                <MdOutlineTranslate className={styles.Navbar__ButtonsSection__Icon}/>
                <a href='' className={styles.Navbar__ButtonsSection__Access}>Access</a>
                <a href='' className={styles.Navbar__ButtonsSection__Register}>Register</a>
            </div>
        </nav>
    );
};