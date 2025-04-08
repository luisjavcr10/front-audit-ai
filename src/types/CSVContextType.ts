import { CSVRow } from './CSVRow';

export interface CSVContextType {
    CSVdata: CSVRow[] | null;
    toggleCSV: (data: CSVRow[]) => void;
}