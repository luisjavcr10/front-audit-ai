"use client"
import styles from './FormLogIn.module.scss';

import { ButtonForm } from '@/components/Shared/ButtonForm';
import { InputForm } from '@/components/Shared/InputForm';

import { emailForm, passwordForm } from '@/constants/formData';

export const FormLogIn = () =>{
    const handleLogIn = () =>{
        console.log('login');
    }

    return(
        <form onSubmit={handleLogIn} className={styles.FormLogIn}>
            <InputForm type={emailForm}/>
            <InputForm type={passwordForm}>
                <p className={styles.FormLogIn__ForgotPassword}>Forgot your password?</p>
            </InputForm>
            <ButtonForm type='local' text='Login'/>
        </form>
    )
}