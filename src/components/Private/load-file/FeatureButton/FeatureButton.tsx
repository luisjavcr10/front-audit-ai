import { useState, useRef, useEffect } from 'react';
import styles from './FeatureButton.module.scss';

export const FeatureButton = ({
    children, 
    typeSelect, 
    dataList,
    selected,
    handleSelect,
}: Readonly<{
    children: React.ReactNode; 
    typeSelect: string; 
    dataList: string[];
    selected:string | null;
    handleSelect: (model: string)=> void;
}>) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent): void {
        if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
            setShowMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    
    return(
        <div className={styles.FeatureButtonContainer}>
            {showMenu && (
                <div ref={menuRef} className={styles.ToggleMenu}>
                    {dataList.map((model) => (
                        <div 
                            key={model} 
                            className={styles.MenuItem}
                            onClick={() => (handleSelect(model), setShowMenu(false))}
                        >
                            {model}
                        </div>
                    ))}
                </div>
            )}
            <div 
                className={styles.FeatureButton}
                onClick={toggleMenu}
            >
                {children}
                {selected===null? typeSelect: selected}
            </div>
        </div>
    );
};