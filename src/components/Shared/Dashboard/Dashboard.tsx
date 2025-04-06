"use client";
import styles from './Dashboard.module.scss';
import { DashboardContainer, ChartContainer, ChartDescription, SectionTitle } from '@/components/DashboardComponents';
import { Bar, Line, Pie, Radar, Doughnut, PolarArea, Bubble, Scatter } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  ArcElement
);

const chartComponents = {
  Line,
  Bar,
  Pie,
  Radar,
  Doughnut,
  PolarArea,
  Bubble,
  Scatter
} as const;

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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

interface Grafic {
  title: string;
  typeGrafic: string;
  chartData: ChartData;
  description: string;
}

const Dashboard = ({grafics}: Readonly<{grafics:Grafic[]}>) => {
  return (
    <DashboardContainer>
      {grafics.map((chart, index) => {
        const ChartComponent = chartComponents[chart.typeGrafic as keyof typeof chartComponents];
        if (!ChartComponent) return null;
    
        return (
          <ChartContainer key={index}>
            <SectionTitle message={chart.title} />
            <div className={styles.SectionInfo}>
              <div className={styles.SectionGrafic}>
                <ChartComponent 
                  data={chart.chartData} 
                  options={chartOptions} 
                />
              </div>
              <ChartDescription text={chart.description} />
            </div>
          </ChartContainer>
        );
      })}
    </DashboardContainer>
  );
};

export default Dashboard;