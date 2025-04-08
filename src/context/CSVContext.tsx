"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CSVRow } from '@/types/CSVRow';
import { CSVContextType } from '@/types/CSVContextType';

const CSVContext = createContext<CSVContextType | undefined>(undefined);

export function CSVProvider({ children }: { children: React.ReactNode }) {
    const [CSVdata, setCSVdata] = useState<CSVRow[] | null>(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem("CSVdata"); // Cambiado a sessionStorage
        if (storedData) {
            setCSVdata(JSON.parse(storedData));
        }
    }, []);

    const toggleCSV = (data: CSVRow[]) => {
        setCSVdata(data);
        sessionStorage.setItem("CSVdata", JSON.stringify(data)); // Cambiado a sessionStorage
    };

    return (
        <CSVContext.Provider value={{ CSVdata, toggleCSV }}>
            {children}
        </CSVContext.Provider>
    );
}

export function useCSVContext() {
    const context = useContext(CSVContext);

    if (context === undefined) {
        throw new Error("useCSVContext must be used within a CSVProvider");
    }

    return context;
}
