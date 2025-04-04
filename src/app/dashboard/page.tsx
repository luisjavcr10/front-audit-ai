"use client"
import styles from './page.module.scss';
import Dashboard from "@/components/Shared/Dashboard/Dashboard"
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const data = sessionStorage.getItem('tempDashboardData');
    if (data) {
        console.log(JSON.parse(data));
        sessionStorage.removeItem('tempDashboardData');
    }
  }, []);

  return (
    <div className={styles.page}>
      <Dashboard/>
    </div>
  )
}