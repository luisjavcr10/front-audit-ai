"use client";
import styles from './FormLogIn.module.scss';
import { useState } from 'react';

import { ButtonForm } from '@/components/Shared/ButtonForm';
import { InputForm } from '@/components/Shared/InputForm';
import { Loader } from '@/components/Shared/Loader';

import { emailForm, passwordForm } from '@/constants/formData';

import { useAuth } from '@/context/AuthContext';

export const FormLogIn = () =>{
    const [loading, setLoading] = useState(false);
    const {handleLogin, isAuthenticated} = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        setLoading(true);
        await handleLogin({username: email, password: password});
        setLoading(false);
        if(isAuthenticated){
            window.location.href = '/upload-file';
            return null;
        }
        
    }

    return(
        <>
            {loading && <Loader />}
            <form onSubmit={handleSubmit}className={styles.FormLogIn}>
                <InputForm type={emailForm}/>
                <InputForm type={passwordForm}>
                    <p className={styles.FormLogIn__ForgotPassword}>Forgot your password?</p>
                </InputForm>
                <ButtonForm type='local' text='Login'/>
            </form>
        </>
    )
}