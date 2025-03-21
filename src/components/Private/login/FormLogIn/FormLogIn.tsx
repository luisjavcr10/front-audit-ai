"use client"
import styles from './FormLogIn.module.scss';
import { ButtonLogIn } from '../ButtonLogIn';

export const FormLogIn = () =>{
    const handleLogIn = () =>{
        console.log('login');
    }

    return(
        <form onSubmit={handleLogIn} className={styles.FormLogIn}>
            <div className={styles.FormLogIn__ItemForm}>
                <label>Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className={styles.FormLogIn__ItemForm}>
                <label>Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <ButtonLogIn type='local' text='Login'/>
        </form>
    )
}