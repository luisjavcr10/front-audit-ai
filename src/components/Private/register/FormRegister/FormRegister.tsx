"use client";

import styles from './FormRegister.module.scss';
import { useState } from 'react';
import { InputForm } from "@/components/Shared/InputForm";
import { ButtonForm } from '@/components/Shared/ButtonForm';
import { Loader } from '@/components/Shared/Loader';
import { emailForm, passwordForm, repeatPasswordForm } from '@/constants/formData';
import { register } from '@/services/apiService';
import { useAuth } from '@/context/AuthContext';

export const FormRegister = () =>{
    const [loading, setLoading] = useState(false);
    const { handleLogin, isAuthenticated } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        //const repeatPassword = formData.get('repeatpassword') as string;
    
        //if (password !== repeatPassword) {
        //    alert("Las contraseñas no coinciden");
        //    return; 
        //}
    
        setLoading(true);
        try {
            await register({ username: email, password: password });
            await handleLogin({ username: email, password: password }); 
    
            if (isAuthenticated) {
                window.location.href = '/upload-file';
            }
        } catch (error) {
            console.error("Error en registro o login:", error);
            alert("Ocurrió un error. Por favor, intenta nuevamente.");
        } finally {
            setLoading(false); 
        }
    };

    return(
        <>
            {loading && <Loader />}
            <form onSubmit={handleSubmit} className={styles.FormRegister}>
                <InputForm type={emailForm}/>
                <InputForm type={passwordForm}/>
                <InputForm type={repeatPasswordForm}>
                    <p className={styles.FormRegister__PasswordDoenstMatch}>
                        Repeat password does not match
                    </p>
                </InputForm> 
                <ButtonForm text='Register' type='local' />
            </form>  
        </>
    )
}