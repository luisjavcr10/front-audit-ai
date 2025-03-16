"use client"
import styles from './page.module.scss';
import { useState, useEffect } from 'react';

export default function Prompt () {
    const [prompt, setPrompt] = useState<string>('');
    const [response, setResponse] = useState<string>('Esperando la respuesta del servidor...');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    }

    const handleGetResponse = async () => {
        try {
            setResponse('Procesando...');
            
            const res = await fetch(`https://backend-audit-ai.onrender.com/completions`, {
                method: "POST",
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: prompt.substring(0, prompt.length / 15),
            });
            
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }
            
            const data = await res.json();
            console.log(data);
            setResponse(data.choices[0].message.content);
            //setResponse(data);
        } catch (error) {
            console.error('Error al obtener respuesta:', error);
            setResponse(`Error al procesar la solicitud: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }

    const handleSendPrompt = () =>{
        handleGetResponse();
    }

    useEffect(() => {
        const storedData = localStorage.getItem('parsedData');
        if (storedData) {
            const data = JSON.parse(storedData);
            setPrompt(JSON.stringify(data, null, 2));
        }
    }, []);

    return(
        <div className={styles.page}>
            <h1>Ingresa el prompt</h1>
            <textarea 
                value={prompt}
                onChange={handleChange}
                placeholder="Escribe tu prompt aquí..."
                rows={5}
                cols={50}
            />
            <button className={styles.page__SendButton} onClick={handleSendPrompt}>Enviar</button>
            <textarea 
                value={response}
                readOnly
                rows={10}
                cols={50}
            />
        </div>
    )
}