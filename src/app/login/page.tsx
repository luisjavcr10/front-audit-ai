import styles from './page.module.scss';
import { FaGoogle } from "react-icons/fa";
import { FormLogIn } from '@/components/Private/login/FormLogIn';
import { ButtonLogIn } from '@/components/Private/login/ButtonLogIn';
import { ThemeButtonInLogin } from '@/components/Private/login/ThemeButtonInLogin';
import { Logo } from '@/components/Shared/Logo';

const infoLogin = {
    image: {
        src:'/images/logo.jpg',
        alt: 'logo',
    },
    buttonGoogle: {
        icon: <FaGoogle/>,
        text: 'Continue with Google'
    },
    separator:'or',
    noAccount: {
        text:"Don't have an account? ",
        link:'',
        linkText:'Sign up'
    },
    terms:"By continuing, you agree to AuditAI's Terms of Service and Privacy Policy."
} 

export default function LogIn () {

    return(
        <main className={styles.page}>
            
            <Logo whereUse='login'/>

            <ButtonLogIn type='google' text={infoLogin.buttonGoogle.text}> 
                {infoLogin.buttonGoogle.icon}
            </ButtonLogIn>

            <h1 className={styles.page__Separator}>{infoLogin.separator}</h1>

            <FormLogIn/>

            <h2 className={styles.page__NoAccount}>
                {infoLogin.noAccount.text}<a href={infoLogin.noAccount.link}>{infoLogin.noAccount.linkText}</a>
            </h2>

            <p className={styles.page__Terms}>
                {infoLogin.terms}
            </p>

            <ThemeButtonInLogin/>
            
        </main>
    )
}