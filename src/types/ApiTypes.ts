import { CSVRow } from './CSVRow';
import { Grafic } from './Grafic';

export interface BodyToGetRegulations {
    sector: string;
    typeaudit: string;
}

export interface BodyToGetListOfRules {
    sector: string;
    typeaudit: string;
    cabeceras: string[];
    normativas: string[];
}

export interface BodyToGetDashboard {
    sector: string;
    typeaudit: string;
    regulations: string[];
    rules: string[];
    CSVdata: CSVRow[] | null;
}

export interface DataResponseDashboard {
    auditResponseDtoList: Grafic[];
}