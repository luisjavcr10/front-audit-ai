import styles from './TriggerSection.module.scss';
import { FaChevronCircleDown } from "react-icons/fa";

export const  TriggerSection = ({
    children,
    toggleDropdown,
    isBlock,
    isOpen
}: Readonly<{
    children: React.ReactNode; 
    toggleDropdown: ()=>void;
    isBlock: boolean;
    isOpen: boolean;
}>) =>{
    return(
        <div 
            onClick={toggleDropdown} 
            className={`${styles.Trigger} ${isBlock? styles.ContentBlock : ''}`}
        >
            {children}    
            <FaChevronCircleDown 
                className={`${ styles.Icon} ${isOpen? styles.rotate: ''}`}
            />
        </div>
    )
}