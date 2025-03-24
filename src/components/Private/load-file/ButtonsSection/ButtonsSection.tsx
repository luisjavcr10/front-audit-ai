import styles from './ButtonsSection.module.scss';

import { aiModels } from '@/constants/aiModels';
import { typeAuditList } from '@/constants/typeAuditList';

import { FeatureButton } from "../FeatureButton"
import { ModelIcon } from "@/utils/ModelIcon"
import { TypeIcon } from "@/utils/TypeIcon"

export const ButtonsSection = ({
    model,
    type,
    handleModel, 
    handleType,
    handleSendRequest
}: Readonly<{
    model: string | null;
    type: string | null;
    handleModel:(model: string)=> void; 
    handleType:(model: string)=> void ;
    handleSendRequest: ()=> void;
}>) =>{
    return(
        <div className={styles.ButtonsSection}>
            <div className={styles.ButtonsSection__FeatureButtons}>
                <FeatureButton 
                    typeSelect='Model AI' 
                    dataList={aiModels}
                    selected={model}
                    handleSelect={handleModel}
                > 
                    <ModelIcon/>
                </FeatureButton>    
                <FeatureButton 
                    typeSelect='Type Audit' 
                    dataList={typeAuditList}
                    selected={type}
                    handleSelect={handleType}
                > 
                    <TypeIcon/>
                </FeatureButton> 
            </div>
            <div onClick={handleSendRequest} className={styles.ButtonsSection__StartButton}>
                Audit with AI
            </div>
        </div>   
    )
}