import styles from './OptionsList.module.scss';
import { FiTrash2,FiEdit3 } from "react-icons/fi";
import { Rule } from '@/types/Rule';

export const OptionsList = ({
    rule,
    deleteRule,
    editRule,
}: Readonly<{
    rule: Rule;
    deleteRule: (rule: Rule) => void;
    editRule: () => void;
}>) =>{
    return(
        <div className={styles.OptionsList}>
            <button 
                onClick={editRule}
                className={styles.OptionsList__Edit}
            >
                <FiEdit3/>
                Edit
            </button>
            <button 
                onClick={() => deleteRule(rule)}
                className={styles.OptionsList__Delete}
            >
                <FiTrash2/>
                Delete
            </button>
        </div>
    )
}