"use client"
import { ThemeButton } from "@/components/Shared/Navbar/ThemeButton"
import styles from './ThemeButtonInLogin.module.scss';

export const ThemeButtonInLogin = () => {
    return(
        <div className={styles.ThemeButtonInLogin}>
            <ThemeButton/>
        </div>
    )
}