import styles from './ButtonLogIn.module.scss';
import { ReactNode } from 'react';

export const ButtonLogIn = ({children, text, type}: Readonly<{children?:ReactNode; text: string; type:string}>) => {
    return(
        <button 
            className={styles.ButtonLogIn} 
            type={`${type === 'local' ? 'submit' : 'button'}`}  
            style={type === 'local' ? {marginTop:'20px'} : {}}
        >
            {children}
            {text}
        </button>
    );
}