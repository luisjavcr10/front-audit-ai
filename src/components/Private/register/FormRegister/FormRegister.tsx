"use client";
import styles from './FormRegister.module.scss';

import { useState } from 'react';

import { InputForm } from "@/components/Shared/InputForm";
import { ButtonForm } from '@/components/Shared/ButtonForm';
import { ErrorToast } from '@/components/Shared/ErrorToast';

import { emailForm, passwordForm, repeatPasswordForm } from '@/constants/formData';

export const FormRegister = () =>{
    const [error, setError] = useState<string | null>(null);

    const handleRegister = () =>{
        console.log('register');
    }

    return(
        <>
            <form onSubmit={handleRegister} className={styles.FormRegister}>
                <InputForm type={emailForm}/>
                <InputForm type={passwordForm}/>
                <InputForm type={repeatPasswordForm}>
                    <p className={styles.FormRegister__PasswordDoenstMatch}>
                        Repeat password does not match
                    </p>
                </InputForm>
                <ButtonForm text='Register' type='local' />
            </form>
            {error && <ErrorToast errorMessage={error} onClose={()=>setError(null)}/>}
        </>
        
    )
}