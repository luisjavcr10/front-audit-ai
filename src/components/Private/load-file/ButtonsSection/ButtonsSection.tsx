import styles from './ButtonsSection.module.scss';

import { aiModels } from '@/constants/aiModels';

import { FeatureButton } from "../FeatureButton"
import { ModelIcon } from "@/utils/icons/ModelIcon"

export const ButtonsSection = ({
    model,
    handleModel, 
    handleSendRequest
}: Readonly<{
    model: string | null;
    handleModel:(model: string)=> void; 
    handleSendRequest: ()=> void;
}>) =>{
    return(
        <div className={styles.ButtonsSection}>
            <div className={styles.ButtonsSection__FeatureButtons}>
                <FeatureButton 
                    typeSelect='AI Model' 
                    dataList={aiModels}
                    selected={model}
                    handleSelect={handleModel}
                > 
                    <ModelIcon/>
                </FeatureButton>    
            </div>
            <div onClick={handleSendRequest} className={styles.ButtonsSection__StartButton}>
                Audit with AI
            </div>
        </div>   
    )
}