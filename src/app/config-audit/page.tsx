"use client"
import styles from './page.module.scss';
import { useState } from 'react';
import { useCSVContext } from '@/context/CSVContext';

import { SelectToConfigAudit } from '@/components/Private/config-audit/SelectToConfigAudit';
import { ButtonToRequest } from '@/components/Private/config-audit/ButtonToRequest';

import { sectorOptions, typeauditOptions } from '@/constants/listConfigAudit';

//Services
import { getListOfRegulations, getListOfRules } from '@/services/apiService';


export default function ConfigAudit() {
    const {CSVdata} = useCSVContext();

    const [sector, setSector] = useState<string>('');
    const [typeaudit, setTypeaudit] = useState<string>('');
    const [regulationsList, setRegulationsList] = useState<string[]>([]);
    const [rulesList, setRulesList] = useState<string[]>([]);

    //dropdown menu
    const [isOpenFirst, setIsOpenFirst] = useState(true);
    const toggleDropdownFirst = () => {
        setIsOpenFirst(!isOpenFirst);
    };
    const [isOpenSecond, setIsOpenSecond] = useState(false);
    const toggleDropdownSecond = () => {
        setIsOpenSecond(!isOpenSecond);
    };

    const getRegulationsList = async () => {
        try {
            const body= {
                sector: sector,
                typeaudit: typeaudit,
            }
            const recommendedRules = await getListOfRegulations(body);
            setRegulationsList(recommendedRules);
            setIsOpenFirst(false);
            setIsOpenSecond(true);
        } catch (error) {
            console.error('Error:', error);
        }   
        
    }

    const getRulesList = async () => {
        try {
            const request= {
                sector: sector,
                typeaudit: typeaudit,
                cabeceras: CSVdata && CSVdata[0]? Object.keys(CSVdata[0]) : [],
                normativas: regulationsList
            }

            const rules = await getListOfRules(request);
            setRulesList(rules);
            console.log(rules);
        } catch (error) {
            console.error('Error:', error);
        }  
    }

    const handleRemoveRegulationsList = (regulation: string) => {
        setRegulationsList((prev)=> prev?.filter((reg)=> reg !== regulation));
    }

    
    return (
        <>
            <div className={styles.DropdownMenu}>
                <div onClick={toggleDropdownFirst} className={styles.DropdownMenu__Trigger}>Tipo y sector</div>
                <div className={`${styles.DropdownMenu__Content} ${isOpenFirst ? styles.active : ''}`}>
                    <div className={styles.DropdownMenu__SelectsDrop}>
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
                    </div>
                    <ButtonToRequest
                        onClick={getRegulationsList}
                        message="Cargar normativas sugeridas"
                    />
                </div>
            </div>
            <div className={styles.DropdownMenu}>
                <div onClick={toggleDropdownSecond} className={styles.DropdownMenu__Trigger}>Normativas</div>
                <div className={`${styles.DropdownMenu__Content} ${isOpenSecond ? styles.active : ''}`}>
                {regulationsList && regulationsList.length > 0 && (
                    <div className={styles.page__normativas}>
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
                <ButtonToRequest
                    onClick={getRulesList}
                    message="Obtener reglas sugeridas"
                />
                </div>
                
            </div>
        </>
    )
}

//Hacer la vista con 3 partes, las cuales podran ser desplegables.