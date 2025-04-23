import styles from './FormRegister.module.scss';

import { InputForm } from "@/components/Shared/InputForm";
import { ButtonForm } from '@/components/Shared/ButtonForm';
import { emailForm, passwordForm, repeatPasswordForm } from '@/constants/formData';

export const FormRegister = () =>{

    return(
        <>
            <form className={styles.FormRegister}>
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