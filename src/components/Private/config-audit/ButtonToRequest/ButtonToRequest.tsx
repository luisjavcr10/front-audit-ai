import styles from './ButtonToRequest.module.scss';

export const ButtonToRequest = ({onClick, message}: Readonly<{onClick: ()=>void; message: string}>) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {message}
        </button>
    );
}