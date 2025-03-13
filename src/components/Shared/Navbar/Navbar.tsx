import styles from './Navbar.module.scss';
import Link from 'next/link';

export const Navbar = () =>{
    return(
        <div className={styles.Navbar}>
            <ul>
                <Link href="">Home</Link>
            </ul>
        </div>
    );
};