import styles from './SelectToConfigAudit.module.scss';

interface SelectOption {
    value: string;
    label: string;
}

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
            <label className={styles.label} >{label}</label>
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