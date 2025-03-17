import styles from '../Navbar.module.scss';

export const Logotipo = () =>{
    return(
        <div className={styles.Navbar__ImgContainer}>
            <img src="/images/logo.jpg" alt="logotipo" />
        </div>
    );
};