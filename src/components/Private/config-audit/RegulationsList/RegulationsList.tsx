import styles from './RegulationsList.module.scss';
import { useState, useRef, useEffect } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { FiTrash2,FiEdit3 } from "react-icons/fi";

export const RegulationsList = ({
    regulationsList,
    handleRemoveRegulationsList,
}:Readonly<{
    regulationsList:string[];
    handleRemoveRegulationsList: (regulation: string) => void;
}>) => {
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
        <>
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
                            onClick={() => toggleMenu(index)}
                            className={styles.List__item__button}
                        >
                            <HiDotsHorizontal />
                        </button>
                        {activeMenuIndex === index && (
                            <div className={styles.ToggleMenu}>
                                <button 
                                    onClick={() => handleRemoveRegulationsList(regulation)}
                                    className={styles.ToggleMenu__Edit}
                                >
                                    <FiEdit3/>
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleRemoveRegulationsList(regulation)}
                                    className={styles.ToggleMenu__Delete}
                                >
                                    <FiTrash2/>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div> 
        </>
    )
}