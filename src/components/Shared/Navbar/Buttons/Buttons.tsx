import styles from '../Navbar.module.scss';
import { ThemeButton } from '../ThemeButton';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { AuthToggle } from '../AuthToggle';
import { LanguageButton } from '../LanguageButton';
import { AwsButton } from "../AwsButton/AwsButton";

export const Buttons = () =>{
    const {isAuthenticated} = useAuth();
    return(
        <div className={styles.Navbar__RightSection}>
            <AwsButton />
            <LanguageButton />
            <ThemeButton/>
            {isAuthenticated ? 
            <AuthToggle/>
            :
            <>
                <Link href='/login' className={styles.Navbar__RightSection__Access}>Access</Link>
                <Link href='/register' className={styles.Navbar__RightSection__Register}>Register</Link>
            </>
            }
            
        </div>
    );
}