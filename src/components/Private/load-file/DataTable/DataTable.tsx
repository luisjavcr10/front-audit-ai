"use client"

import styles from './DataTable.module.scss';
import { useCSVContext } from '@/context/CSVContext';

export const Datatable = () => {
    const {CSVdata} = useCSVContext();

    if (CSVdata === null) {
        return(
            <div className={styles.TableContainer}>
            </div>
        );
    }

    return (
        <div className={styles.TableContainer}>
            <table>
                <thead>
                    <tr>
                        {Object.keys(CSVdata[0]).map((header) => (
                            <th key={header}>{header.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {CSVdata.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}