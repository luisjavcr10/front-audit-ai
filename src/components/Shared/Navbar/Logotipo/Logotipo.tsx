import { Logo } from '../../Logo';
import styles from '../Navbar.module.scss';

export const Logotipo = () =>{
    return(
        <div className={styles.Navbar__ImgContainer}>
            <Logo whereUse='navbar'/>
        </div>
    );
};