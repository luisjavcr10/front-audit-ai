import styles from '../Navbar.module.scss';
import { ThemeButton } from '../ThemeButton';
import Link from 'next/link';

export const Buttons = () =>{
    return(
        <>
            <ThemeButton/>
            <Link href='/login' className={styles.Navbar__RightSection__Access}>Access</Link>
            <Link href='/register' className={styles.Navbar__RightSection__Register}>Register</Link>
        </>
    );
}