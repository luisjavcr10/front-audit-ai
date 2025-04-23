import styles from './InputForm.module.scss';
import { InputFormProps } from '@/types/InputFormProps';

export const InputForm = ({type, children}: Readonly<{type:InputFormProps; children?:React.ReactNode}>) => {
    return(
        <div className={styles.InputForm}>
            <label>{type.title}</label>
            <input type={type.feature} name={type.name} id={type.name} />
            {children}
        </div>
    )
}