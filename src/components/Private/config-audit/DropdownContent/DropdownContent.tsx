import styles from './DropdownContent.module.scss';

export const DropdownContent = ({
    children,
    isOpen,
    isDone
}:Readonly<{
    children:React.ReactNode;
    isOpen:boolean;
    isDone?:boolean;
}>) => {
    return(
        <div 
        className={`${styles.Content} 
                    ${isOpen ? styles.active : ''}
                    ${isDone === true ? styles.ContentBlock : ''}`
        }
        >
            {children}
        </div>
    )
}