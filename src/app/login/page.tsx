"use client"

import styles from './page.module.scss';
import Image from 'next/image';
import { FaGoogle } from "react-icons/fa";

export default function LogIn () {
    const handleLogIn = () =>{
        console.log('login');
    }

    return(
        <main className={styles.page}>
            <Image 
                src='/images/logo.jpg'
                alt='logo'
                width={232}
                height={70}
            />

            <button className={styles.page__GoogleButton}>
                <FaGoogle />
                Continue with Google
            </button>

            <h1>or</h1>

            <form onSubmit={handleLogIn}>
                <div className={styles.page__ItemForm}>
                    <label>Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className={styles.page__ItemForm}>
                    <label>Password</label>
                    <input type="password" name="password" id="password" />

                </div>
                <button className={styles.page__ButtonLogin} type='submit'>
                    Login
                </button>
            </form>

            <h2>
                Don&apos;t have an account? <a href=''>Sign up</a>
            </h2>

            <p>
                By continuing, you agree to AuditAI's Terms of Service and Privacy Policy.
            </p>
        </main>
    )
}