import styles from './ThemeButton.module.scss';
import { MdLightMode, MdDarkMode  } from "react-icons/md";
import { useTheme } from '@/context/ThemeContext';

export const ThemeButton = () =>{
    const {theme, toggleTheme} = useTheme();

    return(
        <button 
            onClick={toggleTheme}
            aria-label='Toggle Theme'
            className={styles.ThemeButton}
        >
            {theme === 'light'? <MdDarkMode className={styles.ThemeButton__Icon}/> : <MdLightMode className={styles.ThemeButton__Icon}/>}
            
        </button>
    );
}