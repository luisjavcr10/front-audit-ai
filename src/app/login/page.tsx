import styles from './page.module.scss';
import Image from 'next/image';
import { FaGoogle } from "react-icons/fa";
import { FormLogIn } from '@/components/Private/login/FormLogIn';
import { ButtonLogIn } from '@/components/Private/login/ButtonLogIn';

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
            <Image 
                src={infoLogin.image.src}
                alt={infoLogin.image.alt}
                width={232}
                height={70}
            />

            <ButtonLogIn type='google' text={infoLogin.buttonGoogle.text}> 
                {infoLogin.buttonGoogle.icon}
            </ButtonLogIn>

            <h1>{infoLogin.separator}</h1>

            <FormLogIn/>

            <h2>
                {infoLogin.noAccount.text}<a href={infoLogin.noAccount.link}>{infoLogin.noAccount.linkText}</a>
            </h2>

            <p>
                {infoLogin.terms}
            </p>
        </main>
    )
}