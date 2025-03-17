import styles from '../Navbar.module.scss';
import { MdOutlineTranslate, MdOutlineLightMode } from "react-icons/md";

export const Buttons = () =>{
    return(
        <>
            <MdOutlineLightMode className={styles.Navbar__RightSection__Icon}/>
            <MdOutlineTranslate className={styles.Navbar__RightSection__Icon}/>
            <a href='' className={styles.Navbar__RightSection__Access}>Access</a>
            <a href='' className={styles.Navbar__RightSection__Register}>Register</a>
        </>
    );
}