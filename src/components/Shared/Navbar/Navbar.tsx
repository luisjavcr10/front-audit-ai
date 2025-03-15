import styles from './Navbar.module.scss';
import Link from 'next/link';
import { MdOutlineTranslate, MdOutlineLightMode } from "react-icons/md";

export const Navbar = () =>{
    return(
        <nav className={styles.Navbar}>
            <div className={styles.Navbar__LinksContainer}>
                <p className={styles.Navbar__Name}>AuditAi</p>
                <ul>
                    <Link className={styles.Navbar__Link} href="">Home</Link>
                    <Link className={styles.Navbar__Link} href="">Load</Link>
                    <Link className={styles.Navbar__Link} href="">Stats</Link>
                </ul>
            </div>
            
            <div className={styles.Navbar__Buttons}>
                <MdOutlineLightMode className={styles.Navbar__Buttons__Icon}/>
                <MdOutlineTranslate className={styles.Navbar__Buttons__Icon}/>
            </div>
        </nav>
    );
};