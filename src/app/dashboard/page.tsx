"use client"
import styles from './page.module.scss';
import Dashboard from "@/components/Shared/Dashboard/Dashboard"
import { useState,useEffect } from 'react';

interface Grafic {
  title: string;
  typeGrafic: string;
  chartData: ChartData;
  description: string;
}
interface ChartData {
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

export default function Page() {
  const [grafics, setGrafics] = useState<Grafic[]>([]); 

  useEffect(() => {
    const data = sessionStorage.getItem('tempDashboardData');
    if (data) {
        setGrafics(JSON.parse(data));
        console.log(JSON.parse(data));
        sessionStorage.removeItem('tempDashboardData');
    }
  }, []);

  return (
    <div className={styles.page}>
      <Dashboard grafics={grafics}/>
    </div>
  )
}