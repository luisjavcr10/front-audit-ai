import styles from '../Navbar.module.scss';
import { ThemeButton } from '../ThemeButton';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaUserCircle } from "react-icons/fa";

export const Buttons = () =>{
    const {isAuthenticated} = useAuth();
    return(
        <>
            <ThemeButton/>
            {isAuthenticated ? 
            <FaUserCircle className={styles.Navbar__RightSection__Icon}/>
            :
            <>
                <Link href='/login' className={styles.Navbar__RightSection__Access}>Access</Link>
                <Link href='/register' className={styles.Navbar__RightSection__Register}>Register</Link>
            </>
            }
            
        </>
    );
}