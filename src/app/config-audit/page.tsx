"use client"
import styles from './page.module.scss';
import { useState } from 'react';
import { useCSVContext } from '@/context/CSVContext';

import { SelectToConfigAudit } from '@/components/Private/config-audit/SelectToConfigAudit';
import { ButtonToRequest } from '@/components/Private/config-audit/ButtonToRequest';
import { Loader } from '@/components/Shared/Loader';
import { TriggerSection } from '@/components/Private/config-audit/TriggerSection';
import { SectionTitleTrigger } from '@/components/Private/config-audit/SectionTitleTrigger';
import { DropdownContent } from '@/components/Private/config-audit/DropdownContent';
import { RegulationsList } from '@/components/Private/config-audit/RegulationsList';
import { RulesList } from '@/components/Private/config-audit/RulesList/RulesList';

import { sectorOptions, typeauditOptions } from '@/constants/listConfigAudit';

//Services
import { getListOfRegulations, getListOfRules, getDashboard } from '@/services/apiService';

import { FaBuilding } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { FaClipboardCheck } from "react-icons/fa6";
import { Rule } from '@/types/Rule';

export default function ConfigAudit() {
    const {CSVdata} = useCSVContext();

    const [sector, setSector] = useState<string>('');
    const [typeaudit, setTypeaudit] = useState<string>('');
    const [regulationsList, setRegulationsList] = useState<string[]>([]);
    const [rulesList, setRulesList] = useState<Rule[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    //Dropdown menu
    const [isOpenFirst, setIsOpenFirst] = useState(true);
    const toggleDropdownFirst = () => {
        setIsOpenFirst(!isOpenFirst);
    };
    const [isDoneFirst, setIsDoneFirst] = useState(false);
    const [isBlockFirst] = useState(false);

    const [isOpenSecond, setIsOpenSecond] = useState(false);
    const toggleDropdownSecond = () => {
        setIsOpenSecond(!isOpenSecond);
    };
    const [isDoneSecond, setIsDoneSecond] = useState(false);
    const [isBlockSecond, setIsBlockSecond] = useState(true);

    const [isOpenThird, setIsOpenThird] = useState(false);
    const toggleDropdownThird = () => {
        setIsOpenThird(!isOpenThird);
    };
    const [isBlockThird, setIsBlockThird] = useState(true);

    //Regulations Section
    const getRegulationsList = async () => {
        try {
            const body= {
                sector: sector,
                typeaudit: typeaudit,
            }
            setIsLoading(true);
            const recommendedRules = await getListOfRegulations(body);
            setIsLoading(false);
            setRegulationsList(recommendedRules);
            setIsOpenFirst(false);
            setIsOpenSecond(true);
            setIsDoneFirst(true);
            setIsBlockSecond(false);
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
            setIsLoading(true);
            const rules = await getListOfRules(request);
            setIsLoading(false);
            setRulesList(rules );
            setIsOpenSecond(false);
            setIsOpenThird(true);
            setIsDoneSecond(true);
            setIsBlockThird(false);
        } catch (error) {
            console.error('Error:', error);
        }  
    }

    const handleRemoveRulesList = (rule: Rule) => {
        setRulesList((prev) => prev.filter((r) => r.nombre !== rule.nombre));
    }

    //Go to dashboard
    const goToDashboard = async () => {
        try {
            const body = {
                sector: sector,
                typeaudit: typeaudit,
                regulations: regulationsList,
                rules: rulesList.map(rule => rule.nombre),
                CSVdata: CSVdata
            }
            console.log(body);
            setIsLoading(true);
            const response = await getDashboard(body);
            setIsLoading(false);
            sessionStorage.setItem('tempDashboardData', JSON.stringify(response.auditResponseDtoList));
            window.location.href = '/dashboard';
            console.log(response);
        } catch (error) {
            console.error('Error executing dashboard analysis:', error);
            setIsLoading(false);
        }
    }
    
    return (
        <>
            {isLoading && <Loader/>}
            <div className={styles.DropdownMenu}>
                <TriggerSection 
                    toggleDropdown={toggleDropdownFirst}
                    isBlock={isBlockFirst}
                    isOpen={isOpenFirst}
                >
                    <SectionTitleTrigger titleText='Select your sector and type of audit'>
                        <FaBuilding />  
                    </SectionTitleTrigger>
                </TriggerSection>

                <DropdownContent
                    isOpen={isOpenFirst}
                    isDone={isDoneFirst}
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
                </DropdownContent>
                
                
            </div>
            <div className={styles.DropdownMenu}>
                <TriggerSection 
                    toggleDropdown={toggleDropdownSecond}
                    isBlock={isBlockSecond}
                    isOpen={isOpenSecond}
                >
                   <SectionTitleTrigger titleText='Applicable regulations for your audit'>
                        <IoIosPaper />  
                    </SectionTitleTrigger>
                </TriggerSection>
                <DropdownContent
                    isOpen={isOpenSecond}
                    isDone={isDoneSecond}
                >
                {regulationsList && regulationsList.length > 0 && (
                    <RegulationsList 
                        regulationsList={regulationsList} 
                        handleRemoveRegulationsList={handleRemoveRegulationsList}
                    />
                        
                )}
                <ButtonToRequest
                    onClick={getRulesList}
                    message="Generate audit rules"
                />
                </DropdownContent>
            </div>
            <div className={styles.DropdownMenu}>

                <TriggerSection 
                    toggleDropdown={toggleDropdownThird}
                    isBlock={isBlockThird}
                    isOpen={isOpenThird}
                >
                   <SectionTitleTrigger titleText='Recommended rules for your analysis'>
                        <FaClipboardCheck />  
                    </SectionTitleTrigger>
                </TriggerSection>

                <DropdownContent
                    isOpen={isOpenThird}
                >
                    {rulesList && rulesList.length > 0 && (
                        <RulesList rulesList={rulesList} deleteRule={handleRemoveRulesList}/>
                        
                    )}
                    <ButtonToRequest
                        onClick={goToDashboard}
                        message="Execute audit analysis"
                    />
                </DropdownContent>
            </div>
        </>
    )
}
