export interface ChartData {
    labels?: string[];
    datasets: Array<{
        label?: string;
        data: number[] | {x: number, y: number, r?: number}[];
        backgroundColor?: string | string[];
        borderColor?: string | string[];
        borderWidth?: number;
        tension?: number;
        fill?: boolean;
    }>;
}