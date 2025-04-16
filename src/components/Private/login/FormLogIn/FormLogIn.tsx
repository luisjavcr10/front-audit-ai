import styles from './FormLogIn.module.scss';

import { ButtonForm } from '@/components/Shared/ButtonForm';
import { InputForm } from '@/components/Shared/InputForm';

import { emailForm, passwordForm } from '@/constants/formData';

export const FormLogIn = () =>{

    return(
        <>
            <form className={styles.FormLogIn}>
                <InputForm type={emailForm}/>
                <InputForm type={passwordForm}>
                    <p className={styles.FormLogIn__ForgotPassword}>Forgot your password?</p>
                </InputForm>
            </form>
            {/** Cuando este listo el login, colocar el boton dentro del form */}
            <ButtonForm type='local' text='Login'/>

        </>
        
    )
}