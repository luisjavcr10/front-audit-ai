"use client"
import styles from './page.module.scss';
import { useState } from 'react';
import { useCSVContext } from '@/context/CSVContext';

import { SelectToConfigAudit } from '@/components/Private/config-audit/SelectToConfigAudit';
import { ButtonToRequest } from '@/components/Private/config-audit/ButtonToRequest';

import { sectorOptions, typeauditOptions } from '@/constants/listConfigAudit';


export default function ConfigAudit() {
    const {CSVdata} = useCSVContext();

    const [sector, setSector] = useState<string>('');
    const [typeaudit, setTypeaudit] = useState<string>('');
    const [regulationsList, setRegulationsList] = useState<string[]>();

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://backend-audit-ai.onrender.com/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sector: sector,
                    typeaudit: typeaudit,
                }),
            });
    

            const responseData = await response.json();
            console.log('Response data:', responseData);
            console.log(responseData.recommendedRules);
            console.log(CSVdata && CSVdata[0] ? Object.keys(CSVdata[0]) : []);
            setRegulationsList(responseData.recommendedRules);
        } catch (error) {
            console.error('Error:', error);
        }   
        
    }

    const handleRemoveRegulationsList = (regulation: string) => {
        setRegulationsList((prev)=> prev?.filter((reg)=> reg !== regulation));
    }
    
    const getRulesList = async () => {
        const request= {
            sector: sector,
            typeaudit: typeaudit,
            cabeceras: CSVdata && CSVdata[0]? Object.keys(CSVdata[0]) : [],
            normativas: regulationsList
        }
        console.log(request);

        const response = await fetch('https://backend-audit-ai.onrender.com/getRules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contextAuditDto: {
                    sector: sector,
                    typeaudit: typeaudit,
                    normativas: regulationsList,
                    metadata:{
                        headCsv: CSVdata && CSVdata[0]? Object.keys(CSVdata[0]) : [],
                    }
                },
                configIADto:{
                    detailLevel: "Alto",
                    language: "Español",
                }

            }),
        });

        const responseData = (await response.json());
        console.log(responseData.rules);
    }

    return (
        <>
            <div className={styles.page__form}>
                <SelectToConfigAudit
                    options={sectorOptions}
                    handleSelected={setSector}
                    label="Sector"
                    name="sector"
                />
                <SelectToConfigAudit
                    options={typeauditOptions}
                    handleSelected={setTypeaudit}
                    label="Type Audit"
                    name="typeaudit"
                />  
                <ButtonToRequest
                    onClick={handleSubmit}
                    message="Cargar normativas sugeridas"
                />
            </div>  
             {regulationsList && regulationsList.length > 0 && (
                <div className={styles.page__normativas}>
                    <h2 className={styles.page__normativas__title}>Normativas Sugeridas</h2>
                    <div className={styles.page__normativas__list}>
                        {regulationsList.map((regulation, index) => (
                            <div key={index} className={styles.page__normativas__list__item}>
                                {regulation}
                                <button onClick={() => handleRemoveRegulationsList(regulation)}>x</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <button onClick={getRulesList}>Obtener reglas sugeridas</button>
        </>
    )
}