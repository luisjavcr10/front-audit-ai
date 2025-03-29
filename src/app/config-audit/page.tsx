"use client"
import styles from './page.module.scss';
import { useState } from 'react';
import { useCSVContext } from '@/context/CSVContext';

const sectorOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
];
const typeauditOptions = [
    { value: 'financial', label: 'Financial' },
    { value: 'operational', label: 'Operational' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'performance', label: 'Performance' },
    { value: 'it', label: 'IT' },
]


export default function ConfigAudit() {
    const {CSVdata} = useCSVContext();

    const [sector, setSector] = useState<string>('');
    const [typeaudit, setTypeaudit] = useState<string>('');
    const [responseState, setResponse] = useState<string[]>();

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
            console.log(responseData.normativas_recomendadas);
            console.log(CSVdata && CSVdata[0] ? Object.keys(CSVdata[0]) : []);
            setResponse(responseData.normativas_recomendadas);
        } catch (error) {
            console.error('Error:', error);
        }   
        
    }
    
    return (
        <div className={styles.page}>
            <h1>Config Audit</h1>

            <label>Sector</label>
            <select onChange={(e) => setSector(e.target.value)} name="sector" id="sector">
                <option value="">Select a sector</option>
                {sectorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <label>Tipo de auditoria</label>
            <select onChange={(e)=>setTypeaudit(e.target.value)} name="typeaudit" id="typeaudit">
                <option value="">Select audit type</option>
                {typeauditOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <button onClick={handleSubmit}>
                Submit
            </button>

            {responseState?.map((normativa, index) => (
                <div key={index}>
                    <p>{normativa}</p>
                </div>
            ))}

        </div>
    )
}