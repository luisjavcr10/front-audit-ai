"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface CSVRow {
    [key: string]: string | number | boolean | null;
}

interface CSVContextType {
    CSVdata: CSVRow[] | null;
    toggleCSV: (data: CSVRow[]) => void;
}

const CSVContext = createContext<CSVContextType | undefined>(undefined);

export function CSVProvider({ children }: { children: React.ReactNode }) {
    const [CSVdata, setCSVdata] = useState<CSVRow[] | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem("CSVdata");
        if (storedData) {
            setCSVdata(JSON.parse(storedData));
        }
    }, []);

    const toggleCSV = (data: CSVRow[]) => {
        setCSVdata(data);
        localStorage.setItem("CSVdata", JSON.stringify(data)); 
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
