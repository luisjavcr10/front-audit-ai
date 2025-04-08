import styles from './RegulationsList.module.scss';
import { useRef } from 'react';
import { FiMinusCircle } from "react-icons/fi";

export const RegulationsList = ({
    regulationsList,
    handleRemoveRegulationsList,
}:Readonly<{
    regulationsList:string[];
    handleRemoveRegulationsList: (regulation: string) => void;
}>) => {
    const menuRef = useRef<HTMLDivElement>(null);

    return(
        <div className={styles.List} ref={menuRef}>
            {regulationsList.map((regulation, index) => (
                <div key={index} className={styles.List__item}>
                    <input 
                        type="text" 
                        value={regulation} 
                        readOnly 
                        className={styles.List__item__input}
                    />
                    <button 
                        onClick={() => handleRemoveRegulationsList(regulation)}
                        className={styles.List__item__button}
                    >
                        <FiMinusCircle className={styles.List__item__button__icon}/>
                    </button>
                </div>
            ))}
           
        </div> 
    )
}