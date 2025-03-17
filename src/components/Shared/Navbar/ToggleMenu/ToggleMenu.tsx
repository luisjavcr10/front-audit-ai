import styles from '../Navbar.module.scss';
import { IoMenu } from "react-icons/io5";

export const ToggleMenu = () => {
    return (
        <div className={styles.Navbar__Menu}>
            <IoMenu className={styles.Navbar__Menu__Icon}/>
        </div>
    )
}