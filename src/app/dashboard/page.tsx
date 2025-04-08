"use client"
import styles from './page.module.scss';
import {Dashboard} from "@/components/Shared/Dashboard"
import { useState,useEffect } from 'react';

import { Grafic } from '@/types/Grafic';

export default function Page() {
  const [grafics, setGrafics] = useState<Grafic[] | undefined>([]); 

  useEffect(() => {
    const data = sessionStorage.getItem('tempDashboardData');
    if (data) {
        setGrafics(JSON.parse(data));
        console.log(JSON.parse(data));
        //sessionStorage.removeItem('tempDashboardData');
    }
  }, []);

  return (
    <div className={styles.page}>
      <Dashboard grafics={grafics || []}/>
    </div>
  )
}