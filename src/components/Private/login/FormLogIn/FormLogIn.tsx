"use client"
import styles from './FormLogIn.module.scss';

import { useState } from 'react';

import { ButtonForm } from '@/components/Shared/ButtonForm';
import { InputForm } from '@/components/Shared/InputForm';
import { ErrorToast } from '@/components/Shared/ErrorToast';

import { emailForm, passwordForm } from '@/constants/formData';

export const FormLogIn = () =>{
    const [error, setError] = useState<string | null>(null);

    const handleLogIn = () =>{
        console.log('login');
    }

    return(
        <>
            <form onSubmit={handleLogIn} className={styles.FormLogIn}>
                <InputForm type={emailForm}/>
                <InputForm type={passwordForm}>
                    <p className={styles.FormLogIn__ForgotPassword}>Forgot your password?</p>
                </InputForm>
                <ButtonForm type='local' text='Login'/>
            </form>

            {error && <ErrorToast errorMessage={error} onClose={()=>setError(null)}/>}

        </>
        
    )
}