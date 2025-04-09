import styles from '../ToggleMenu.module.scss';
import { MdDarkMode,MdLightMode } from "react-icons/md";
import { useTheme } from '@/context/ThemeContext';

export const ItemTheme = () =>{
    const {theme, toggleTheme} = useTheme();

    return(
        <div 
            onClick={toggleTheme}
            aria-label='Toggle Theme'
            className={styles.ToggleMenu__Item}
        >
            {theme === 'light'
            ? 
                <MdDarkMode className={styles.ToggleMenu__Item__Icon}/> 
            : 
                <MdLightMode className={styles.ToggleMenu__Item__Icon}/>}
            <p className={styles.ToggleMenu__Item__Title}>{theme === 'light'? 'Dark mode' : 'Light mode'}</p>
        </div>
    );
}