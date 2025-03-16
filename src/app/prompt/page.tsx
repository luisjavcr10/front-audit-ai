"use client"
import styles from './page.module.scss';
import { useState, useEffect } from 'react';

export default function Prompt () {
    const [prompt, setPrompt] = useState<string>('');
    const [response, setResponse] = useState<string>('Esperando la respuesta del servidor...');
    const [parsedData, setParsedData] = useState<any[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    }

    const transactions = [
        {
            id: 1,
            date: "2024-03-10",
            description: "Pago de factura",
            amount: 1500.00,
            type: "Ingreso",
            category: "Ventas",
            account: "Banco ABC"
        },
        {
            id: 2,
            date: "2024-03-11",
            description: "Compra de insumos",
            amount: -500.00,
            type: "Egreso",
            category: "Materiales",
            account: "Banco ABC"
        },
        {
            id: 3,
            date: "2024-03-12",
            description: "Pago de nómina",
            amount: -2000.00,
            type: "Egreso",
            category: "Salarios",
            account: "Banco XYZ"
        },
        {
            id: 4,
            date: "2024-03-13",
            description: "Venta de productos",
            amount: 3000.00,
            type: "Ingreso",
            category: "Ventas",
            account: "Banco XYZ"
        },
        {
            id: 5,
            date: "2024-03-14",
            description: "Pago de renta",
            amount: -1200.00,
            type: "Egreso",
            category: "Gastos Fijos",
            account: "Banco ABC"
        },
        {
            id: 6,
            date: "2024-03-15",
            description: "Pago de proveedor",
            amount: -800.00,
            type: "Egreso",
            category: "Proveedores",
            account: "Banco XYZ"
        },
        {
            id: 7,
            date: "2024-03-16",
            description: "Reembolso de impuestos",
            amount: 600.00,
            type: "Ingreso",
            category: "Finanzas",
            account: "Banco ABC"
        },
        {
            id: 8,
            date: "2024-03-17",
            description: "Compra de equipos",
            amount: -1500.00,
            type: "Egreso",
            category: "Inversiones",
            account: "Banco ABC"
        },
        {
            id: 9,
            date: "2024-03-18",
            description: "Pago de intereses",
            amount: -300.00,
            type: "Egreso",
            category: "Préstamos",
            account: "Banco XYZ"
        },
        {
            id: 10,
            date: "2024-03-19",
            description: "Cobro de cliente",
            amount: 2500.00,
            type: "Ingreso",
            category: "Cuentas por Cobrar",
            account: "Banco ABC"
        }
    ];

    const dataTableFakeString = JSON.stringify(transactions, null, 2);

    //Metodo para verificar datos, borrar pronto
    const setDataTableAsPrompt = () => {
        setPrompt(dataTableFakeString);
        console.log(typeof prompt);
        console.log(prompt);
    };

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
            setParsedData(data);
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