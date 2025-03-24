import { useState } from 'react';
import styles from './FeatureButton.module.scss';

export const FeatureButton = ({children, type}: Readonly<{children: React.ReactNode; type: string}>) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedModel, setSelectedModel] = useState('Model');
    
    const aiModels = [
        'GPT-4',
        'GPT-3.5',
        'Claude 3 Opus',
        'Claude 3 Sonnet',
        'Gemini Pro',
        'Llama 3',
        'Mistral Large',
        'Falcon'
    ];
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    
    const selectModel = (model: string) => {
        setSelectedModel(model);
        setShowMenu(false);
    };
    
    return(
        <div className={styles.FeatureButtonContainer}>
            {showMenu && (
                <div className={styles.ToggleMenu}>
                    {aiModels.map((model) => (
                        <div 
                            key={model} 
                            className={styles.MenuItem}
                            onClick={() => selectModel(model)}
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
                {selectedModel}
            </div>
        </div>
    );
};