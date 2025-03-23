import styles from './DataTable.module.scss';

interface CSVRow {
    [key: string]: string | number | boolean | null;
}

export const Datatable = ({data}: Readonly<{data: CSVRow[]}>) => {
    if (data.length === 0) {
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
                        {Object.keys(data[0]).map((header) => (
                            <th key={header}>{header.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
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