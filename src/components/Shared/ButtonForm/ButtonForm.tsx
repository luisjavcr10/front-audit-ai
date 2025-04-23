"use client";

import styles from './ButtonForm.module.scss';
import { useState } from 'react';
import { ErrorToast } from '../ErrorToast';

export const ButtonForm = ({children, text, type}: Readonly<{children?:React.ReactNode; text: string; type:string}>) => {
    const [error, setError] = useState<string | null>(null);
    //const handleClick = () => {
    //        setError('Unavailable now!');
    //};
    return(
        <>
        {error && <ErrorToast errorMessage={error} onClose={()=>setError(null)} />}
        <button 
            className={styles.ButtonForm} 
            type={`${type === 'local' ? 'submit' : 'button'}`}  
            style={type === 'local' ? {marginTop:'20px'} : {}}
        >
            {children}
            {text}
        </button>

        </>
    );
}