import { CSVRow } from './CSVRow';

export interface GoogleDriveIntegrationProps {
  onFileLoaded: (data: CSVRow[]) => void;
  handleLoading: (value: boolean) => void;
}