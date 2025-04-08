import styles from './Stepper.module.scss';

export const Stepper = ({
    isDoneFirst,
    isDoneSecond,
    isDoneThird,
}:Readonly<{
    isDoneFirst:boolean;
    isDoneSecond:boolean;
    isDoneThird:boolean;
}>) =>{
    return(
        <div className={styles.Stepper}>
            <div className={`${styles.Stepper__item} ${isDoneFirst? styles.Stepper__done: styles.Stepper__inprogress }`}></div>
            <div className={`${styles.Stepper__item} ${isDoneSecond? styles.Stepper__done: styles.Stepper__inprogress }`}></div>
            <div className={`${styles.Stepper__item} ${isDoneThird? styles.Stepper__done: styles.Stepper__inprogress }`}></div>
        </div>
    )
}