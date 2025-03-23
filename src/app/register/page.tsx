import Link from 'next/link';
import styles from './page.module.scss';

import { ButtonForm } from '@/components/Shared/ButtonForm';
import { Logo } from '@/components/Shared/Logo';
import { FormRegister } from "@/components/Private/register/FormRegister";
import { ThemeButtonInLogin } from '@/components/Private/login/ThemeButtonInLogin';

import { infoRegister } from '@/constants/infoRegister';

export default function Register() {
    return(
        <main className={styles.page}>

            <div className={styles.page__LeftContainer}>
                <Logo whereUse={infoRegister.typeLogo}/>
                <ButtonForm type={infoRegister.button.type} text={infoRegister.button.text}> 
                    {infoRegister.button.icon}
                </ButtonForm>
                <p className={styles.page__Separator}>{infoRegister.separator}</p>
            </div>

            <div className={styles.page__RightContainer}>
                <FormRegister/>
                <p className={styles.page__HaveAccount}>
                {infoRegister.haveAccount.text}<Link href={infoRegister.haveAccount.link}> {infoRegister.haveAccount.linkText}</Link>
                </p>

                <p className={styles.page__Terms}>
                {infoRegister.terms}
                </p>
            </div>
            <ThemeButtonInLogin/>
        </main>
    )
}