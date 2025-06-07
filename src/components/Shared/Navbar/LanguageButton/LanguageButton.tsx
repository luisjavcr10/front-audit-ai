import { translateText } from "@/services/apiTranslator";
import styles from './LanguageButton.module.scss';
import { MdOutlineTranslate } from "react-icons/md";
import { useState } from "react";

interface Language {
    code: string;
    name: string;
}

export const LanguageButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    
    const languages: Language[] = [
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'it', name: 'Italiano' },
        { code: 'pt', name: 'Português' },
        { code: 'ko', name: '한국인' }
    ];
    async function translatePage(targetLanguage: string) {
        const textNodes: Node[] = [];
    
        function getTextNodes(node: Node) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).closest('script, style, noscript')) {
                for (const child of node.childNodes) {
                    getTextNodes(child);
                }
            }
        }
    
        getTextNodes(document.body);
    
        for (const node of textNodes) {
            const originalText = node.textContent!.trim();
            const translated = await translateText(originalText, targetLanguage);
            node.textContent = translated;
        }
    }
    
    return(
        <div className={styles.LanguageButton}>
            <button className={styles.LanguageButton__Button} onClick={() => setShowMenu(!showMenu)}>
                <MdOutlineTranslate className={styles.LanguageButton__Button__Icon}/>
            </button>
            
            {showMenu && (
                <div className={styles.Toggle}>
                    {languages.map((language, index) => (
                        <div 
                            key={index} 
                            className={styles.Toggle__Item} 
                            onClick={() => { 
                                translatePage(language.code); 
                                setShowMenu(false); 
                            }}
                        >
                            {language.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}