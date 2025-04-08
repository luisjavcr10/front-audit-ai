import styles from './OptionsList.module.scss';
import { FiTrash2,FiEdit3 } from "react-icons/fi";

export const OptionsList = ({
    regulation,
    handleRemoveRegulationsList,
}: Readonly<{
    regulation: string;
    handleRemoveRegulationsList: (regulation: string) => void;
}>) =>{
    return(
        <div className={styles.OptionsList}>
            <button 
                onClick={() => handleRemoveRegulationsList(regulation)}
                className={styles.OptionsList__Edit}
            >
                <FiEdit3/>
                Edit
            </button>
            <button 
                onClick={() => handleRemoveRegulationsList(regulation)}
                className={styles.OptionsList__Delete}
            >
                <FiTrash2/>
                Delete
            </button>
        </div>
    )
}