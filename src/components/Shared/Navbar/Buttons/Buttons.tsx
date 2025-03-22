import styles from '../Navbar.module.scss';
import { ThemeButton } from '../ThemeButton';
import { MdOutlineTranslate } from "react-icons/md";

export const Buttons = () =>{
    return(
        <>
            <ThemeButton/>


            <MdOutlineTranslate className={styles.Navbar__RightSection__Icon}/>
            <a href='' className={styles.Navbar__RightSection__Access}>Access</a>
            <a href='' className={styles.Navbar__RightSection__Register}>Register</a>
        </>
    );
}