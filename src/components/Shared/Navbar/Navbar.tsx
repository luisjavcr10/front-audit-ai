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
                    <li><Link className={styles.Navbar__Link} href="/">Home</Link></li>
                    <li><Link className={styles.Navbar__Link} href="/load-file">LoadFile</Link></li>
                    <li><Link className={styles.Navbar__Link} href="/prompt">Prompt</Link></li>
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