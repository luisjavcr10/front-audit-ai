"use client";
import styles from './FormLogIn.module.scss';
import { useState } from 'react';

import { ButtonForm } from '@/components/Shared/ButtonForm';
import { InputForm } from '@/components/Shared/InputForm';
import { Loader } from '@/components/Shared/Loader';

import { emailForm, passwordForm } from '@/constants/formData';

import { login } from '@/services/apiService';

export const FormLogIn = () =>{
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        setLoading(true);
        const token = await login({username: email, password: password});
        setLoading(false);
        console.log(token)
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