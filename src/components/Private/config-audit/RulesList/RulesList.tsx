import styles from './RulesList.module.scss';
import { useState, useRef, useEffect } from 'react';
import { OptionsList } from '../OptionsList';
import { HiDotsHorizontal } from "react-icons/hi";
import { Rule } from '@/types/Rule';

export const RulesList = ({
    rulesList,
    deleteRule
}: Readonly<{
    rulesList:Rule[],
    deleteRule: (rule: Rule)=>void
}>) =>{
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenuIndex(null);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (index: number) => {
        setActiveMenuIndex(activeMenuIndex === index ? null : index);
    };

    return(
         <div className={styles.List} ref={menuRef}>
            {rulesList.map((rule, index) => (
                <div key={index} className={styles.List__item}>
                    <input 
                        type="text" 
                        value={rule.nombre} 
                        readOnly 
                        className={styles.List__item__input}
                    />
                    <button 
                        onClick={() => toggleMenu(index)}
                        className={styles.List__item__button}
                    >
                        <HiDotsHorizontal/>
                    </button>
                    {activeMenuIndex === index && (
                        <OptionsList rule={rule} deleteRule={deleteRule}/>
                    )}
                </div>
            ))}

        </div> 
    )
}