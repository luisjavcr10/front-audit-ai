import styles from './ButtonForm.module.scss';
import { ReactNode } from 'react';

export const ButtonForm = ({children, text, type}: Readonly<{children?:ReactNode; text: string; type:string}>) => {
    return(
        <button 
            className={styles.ButtonForm} 
            type={`${type === 'local' ? 'submit' : 'button'}`}  
            style={type === 'local' ? {marginTop:'20px'} : {}}
        >
            {children}
            {text}
        </button>
    );
}