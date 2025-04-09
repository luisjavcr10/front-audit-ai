import styles from './ButtonsSection.module.scss';

import { aiModels } from '@/constants/aiModels';

import { FeatureButton } from "../FeatureButton"
import { ModelIcon } from "@/utils/icons/ModelIcon"

export const ButtonsSection = ({
    model,
    handleModel, 
    handleRedirect,
}: Readonly<{
    model: string | null;
    handleModel:(model: string)=> void; 
    handleRedirect: () => void;
}>) =>{
    return(
        <div className={styles.ButtonsSection}>
            <FeatureButton 
                typeSelect='AI Model' 
                dataList={aiModels}
                selected={model}
                handleSelect={handleModel}
            > 
                <ModelIcon/>
            </FeatureButton>  
            <button onClick={handleRedirect} className={styles.ButtonsSection__StartButton}>
                Set up your audit 
            </button>
        </div>   
    )
}