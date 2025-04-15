import Link from 'next/link';
import styles from './page.module.scss';

import { ButtonForm } from '@/components/Shared/ButtonForm';
import { Logo } from '@/components/Shared/Logo';
import { FormLogIn } from '@/components/Private/login/FormLogIn';
import { ThemeButtonInLogin } from '@/components/Private/login/ThemeButtonInLogin';

import { infoLogin } from '@/constants/infoLogin';

export default function LogIn() {
    return (
        <main className={styles.page}>
            <Logo whereUse={"login"} />

            <ButtonForm type={infoLogin.button.type} text={infoLogin.button.text}> 
                {infoLogin.button.icon}
            </ButtonForm>

            <p className={styles.page__Separator}>{infoLogin.separator}</p>

            <FormLogIn />

            <p className={styles.page__NoAccount}>
                {infoLogin.noAccount.text}
                <Link href={infoLogin.noAccount.link}>
                    {infoLogin.noAccount.linkText}
                </Link>
            </p>

            <p className={styles.page__Terms}>
                {infoLogin.terms}
            </p>

            <ThemeButtonInLogin />
        </main>
    );
}