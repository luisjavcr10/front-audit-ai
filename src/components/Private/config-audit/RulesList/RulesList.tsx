import styles from './RulesList.module.scss';
import { useState, useRef, useEffect } from 'react';
import { OptionsList } from '../OptionsList';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { Rule } from '@/types/Rule';

export const RulesList = ({
    rulesList,
    deleteRule,
    editRule
}: Readonly<{
    rulesList:Rule[],
    deleteRule: (rule: Rule)=>void,
    editRule: (rule: Rule, newName: string)=>void
}>) =>{
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedName, setEditedName] = useState<string>("");
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

    const startEditing = (index: number, ruleName: string) => {
        setEditingIndex(index);
        setEditedName(ruleName);
        setActiveMenuIndex(null);
    };

    const saveEdit = (rule: Rule) => {
        if (editedName.trim() !== "") {
            editRule(rule, editedName);
        }
        setEditingIndex(null);
    };

    return(
         <div className={styles.List} ref={menuRef}>
            {rulesList.map((rule, index) => (
                <div key={index} className={styles.List__item}>
                    {editingIndex === index ? (
                        <>
                            <input 
                                type="text" 
                                value={editedName} 
                                onChange={(e) => setEditedName(e.target.value)}
                                className={`${styles.List__item__input} ${styles.List__item__input__editing}`}
                                autoFocus
                            />
                            
                            <button 
                                onClick={() => saveEdit(rule)}
                                className={`${styles.List__item__button} ${styles.List__item__buttonCheck}`}
                            >
                                <FaCheckCircle/>
                            </button>
                        </>
                    ) : (
                        <>
                        <input 
                            type="text" 
                            value={rule.nombre} 
                            readOnly 
                            className={styles.List__item__input}
                        />
                        <button 
                        onClick={() => toggleMenu(index)}
                        className={`${styles.List__item__button} ${styles.List__item__buttonOptions}`}
                        >
                            <HiDotsHorizontal/>
                        </button>
                        </>
                    )}
                    
                    {activeMenuIndex === index && (
                        <OptionsList 
                            rule={rule} 
                            deleteRule={deleteRule}
                            editRule={() => startEditing(index, rule.nombre)}
                        />
                    )}
                </div>
            ))}

        </div> 
    )
}