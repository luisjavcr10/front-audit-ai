"use client"
import styles from './page.module.scss';
import { useState } from 'react';
import { useCSVContext } from '@/context/CSVContext';

import { SelectToConfigAudit } from '@/components/Private/config-audit/SelectToConfigAudit';
import { ButtonToRequest } from '@/components/Private/config-audit/ButtonToRequest';

import { sectorOptions, typeauditOptions } from '@/constants/listConfigAudit';

//Services
import { getListOfRegulations, getListOfRules } from '@/services/apiService';

import { FaChevronCircleDown } from "react-icons/fa";

interface Rule{
    nombre: string;
    descripcion: string;
    normativaRelacionada: string;
    severidad: string;
}

export default function ConfigAudit() {
    const {CSVdata} = useCSVContext();

    const [sector, setSector] = useState<string>('');
    const [typeaudit, setTypeaudit] = useState<string>('');
    const [regulationsList, setRegulationsList] = useState<string[]>([]);
    const [rulesList, setRulesList] = useState<Rule[]>([]);

    //Dropdown menu
    const [isOpenFirst, setIsOpenFirst] = useState(true);
    const toggleDropdownFirst = () => {
        setIsOpenFirst(!isOpenFirst);
    };
    const [isDoneFirst, setIsDoneFirst] = useState(false);

    const [isOpenSecond, setIsOpenSecond] = useState(false);
    const toggleDropdownSecond = () => {
        setIsOpenSecond(!isOpenSecond);
    };
    const [isDoneSecond, setIsDoneSecond] = useState(false);

    const [isOpenThird, setIsOpenThird] = useState(false);
    const toggleDropdownThird = () => {
        setIsOpenThird(!isOpenThird);
    };

    //Regulations Section
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
            setIsDoneFirst(true);
        } catch (error) {
            console.error('Error:', error);
        }   
        
    }
    
    const handleRemoveRegulationsList = (regulation: string) => {
        setRegulationsList((prev)=> prev?.filter((reg)=> reg !== regulation));
    }

    //Rules Section
    const getRulesList = async () => {
        try {
            const request= {
                sector: sector,
                typeaudit: typeaudit,
                cabeceras: CSVdata && CSVdata[0]? Object.keys(CSVdata[0]) : [],
                normativas: regulationsList
            }

            const rules = await getListOfRules(request);
            setRulesList(rules );
            setIsOpenSecond(false);
            setIsOpenThird(true);
            setIsDoneSecond(true);
            console.log(rules);
        } catch (error) {
            console.error('Error:', error);
        }  
    }

    const handleRemoveRulesList = (rule: Rule) => {
        setRegulationsList((prev)=> prev?.filter((reg)=> reg !== rule.nombre));
    }
    
    return (
        <>
            <div className={styles.DropdownMenu}>
                <div 
                    onClick={toggleDropdownFirst} 
                    className={styles.DropdownMenu__Trigger}
                >
                    Select your sector and type of audit
                    <FaChevronCircleDown 
                        className={`${ styles.DropdownMenu__Icon} ${isOpenFirst? styles.rotate: ''}`}
                    />
                </div>
                <div 
                    className={`${styles.DropdownMenu__Content} 
                                ${isOpenFirst ? styles.active : ''}
                                ${isDoneFirst ? styles.DropdownMenu__ContentBlock : ''}`
                    }
                >
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
                        message="View recommended regulations"
                    />
                </div>
            </div>
            <div className={styles.DropdownMenu}>
                <div 
                    onClick={toggleDropdownSecond} 
                    className={styles.DropdownMenu__Trigger}
                >
                    Applicable regulations for your audit
                    <FaChevronCircleDown 
                        className={`${ styles.DropdownMenu__Icon} ${isOpenSecond? styles.rotate: ''}`}
                    />
                </div>
                <div 
                    className={`
                                ${styles.DropdownMenu__Content} 
                                ${isOpenSecond ? styles.active : ''}
                                ${isDoneSecond ? styles.DropdownMenu__ContentBlock : ''}
                    `}
                >
                {regulationsList && regulationsList.length > 0 && (
                    <div className={styles.page__normativas}>
                        <div className={styles.page__normativas__list}>
                            {regulationsList.map((regulation, index) => (
                                <div key={index} className={styles.page__normativas__list__item}>
                                    <input 
                                        type="text" 
                                        value={regulation} 
                                        readOnly 
                                        className={styles.page__normativas__list__item__input}
                                    />
                                    <button 
                                        onClick={() => handleRemoveRegulationsList(regulation)}
                                        className={styles.page__normativas__list__item__button}
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <ButtonToRequest
                    onClick={getRulesList}
                    message="Generate audit rules"
                />
                </div>
            </div>
            <div className={styles.DropdownMenu}>
                <div 
                    onClick={toggleDropdownThird} 
                    className={styles.DropdownMenu__Trigger}
                >
                    Recommended rules for your analysis
                    <FaChevronCircleDown 
                        className={`${ styles.DropdownMenu__Icon} ${isOpenThird? styles.rotate: ''}`}
                    />
                </div>
                <div className={`${styles.DropdownMenu__Content} ${isOpenThird ? styles.active : ''}`}>
                {rulesList && rulesList.length > 0 && (
                    <div className={styles.page__normativas}>
                        <div className={styles.page__normativas__list}>
                            {rulesList.map((rule, index) => (
                                <div key={index} className={styles.page__normativas__list__item}>
                                    <input 
                                        type="text" 
                                        value={rule.nombre} 
                                        readOnly 
                                        className={styles.page__normativas__list__item__input}
                                    />
                                    <button 
                                        onClick={() => handleRemoveRulesList(rule)}
                                        className={styles.page__normativas__list__item__button}
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <ButtonToRequest
                    onClick={getRulesList}
                    message="Execute audit analysis"
                />
                </div>
            </div>
        </>
    )
}
