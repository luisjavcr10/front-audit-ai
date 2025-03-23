import styles from './InputForm.module.scss';

interface typeProps {
    title: string
    feature: string
}

export const InputForm = ({type, children}: Readonly<{type:typeProps; children?:React.ReactNode}>) => {
    return(
        <div className={styles.InputForm}>
            <label>{type.title}</label>
            <input type={type.feature} name={type.feature} id={type.feature} />
            {children}
        </div>
    )
}