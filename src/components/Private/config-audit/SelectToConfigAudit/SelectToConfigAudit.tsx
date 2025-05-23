import styles from './SelectToConfigAudit.module.scss';
import { SelectOption } from '@/types/SelectOption';

export const SelectToConfigAudit = ({
    options, 
    handleSelected,
    label,
    name
}: Readonly<{
    options: SelectOption[]; 
    handleSelected: (value: string) => void;
    label: string;
    name: string;
}>) => {
    return (
        <div className={styles.Container}>
            <div className={styles.Container__LabelSecion}>
                <label className={styles.label} >{label}</label>
            </div>
            
            <select 
                className={styles.select}
                onChange={(e) => handleSelected(e.target.value)} 
                name={name} 
                id={name}
            >
                <option value="">Select a {label.toLowerCase()}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}