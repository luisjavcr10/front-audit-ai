"use client"
import styles from './FormLogIn.module.scss';
import { ButtonLogIn } from '../ButtonLogIn';
import { InputForm } from '@/components/Shared/InputForm';

const emailForm = {
    title: 'Email',
    feature: 'email'
}

const passwordForm = {
    title: 'Password',
    feature: 'password'
}

export const FormLogIn = () =>{
    const handleLogIn = () =>{
        console.log('login');
    }

    return(
        <form onSubmit={handleLogIn} className={styles.FormLogIn}>
            <InputForm type={emailForm}/>
            <InputForm type={passwordForm}/>
            <ButtonLogIn type='local' text='Login'/>
        </form>
    )
}