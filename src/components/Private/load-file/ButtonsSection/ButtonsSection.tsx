import styles from './ButtonsSection.module.scss';

import { aiModels } from '@/constants/aiModels';
import { typeAuditList } from '@/constants/typeAuditList';

import { FeatureButton } from "../FeatureButton"
import { ModelIcon } from "@/utils/ModelIcon"
import { TypeIcon } from "@/utils/TypeIcon"
import Link from 'next/link';

export const ButtonsSection = ({
    model,
    type,
    handleModel, 
    handleType,
}: Readonly<{
    model: string | null;
    type: string | null;
    handleModel:(model: string)=> void; 
    handleType:(model: string)=> void ;
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
                <FeatureButton 
                    typeSelect='Audit Type' 
                    dataList={typeAuditList}
                    selected={type}
                    handleSelect={handleType}
                > 
                    <TypeIcon/>
                </FeatureButton> 
            </div>
            <Link href='/config-audit' className={styles.ButtonsSection__StartButton}>
                Audit with AI
            </Link>
        </div>   
    )
}