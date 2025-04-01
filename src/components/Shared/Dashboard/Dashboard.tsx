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

interface ChartConfig {
  title: string;
  typeGrafic: keyof typeof chartComponents;
  chartData: ChartData;
  description: string;
}

const grafics : ChartConfig[]= [
  // Gráfico de Barras (existente)
  {
    title: 'Comparación Mensual',
    typeGrafic: 'Bar',
    chartData: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Ventas',
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: 'rgba(52, 152, 219, 0.7)',
          borderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 1,
        },
        {
          label: 'Gastos',
          data: [28, 48, 40, 19, 86, 27],
          backgroundColor: 'rgba(231, 76, 60, 0.7)',
          borderColor: 'rgba(231, 76, 60, 1)',
          borderWidth: 1,
        },
      ],
    },
    description: 'Comparación entre ventas y gastos durante el primer semestre del año.'
  },
  // Gráfico de Línea (existente)
  {
    title: 'Tendencia Semanal',
    typeGrafic: 'Line',
    chartData: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Usuarios activos',
          data: [140, 210, 180, 270, 230, 300, 280],
          borderColor: 'rgba(46, 204, 113, 1)',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          tension: 0.3,
          fill: false,
        },
      ],
    },
    description: 'Tendencia de usuarios activos durante la semana.'
  },
  // Gráfico de Pie
  {
    title: 'Distribución de Mercado',
    typeGrafic: 'Pie',
    chartData: {
      labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
      datasets: [
        {
          data: [35, 25, 20, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    description: 'Distribución porcentual de participación de mercado por producto.'
  },
  // Gráfico de Radar
  {
    title: 'Evaluación de Competencias',
    typeGrafic: 'Radar',
    chartData: {
      labels: ['Tecnología', 'Marketing', 'Ventas', 'Soporte', 'Finanzas', 'Operaciones'],
      datasets: [
        {
          label: 'Equipo A',
          data: [80, 70, 90, 85, 65, 75],
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          borderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 2,
        },
        {
          label: 'Equipo B',
          data: [60, 85, 70, 75, 80, 65],
          backgroundColor: 'rgba(155, 89, 182, 0.2)',
          borderColor: 'rgba(155, 89, 182, 1)',
          borderWidth: 2,
        },
      ],
    },
    description: 'Comparación de competencias entre equipos en diferentes áreas.'
  },
  // Gráfico de Doughnut
  {
    title: 'Fuentes de Tráfico',
    typeGrafic: 'Doughnut',
    chartData: {
      labels: ['Directo', 'Buscadores', 'Redes Sociales', 'Referidos', 'Email'],
      datasets: [
        {
          data: [30, 40, 15, 10, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    description: 'Distribución porcentual de las fuentes de tráfico del sitio web.'
  },
  // Gráfico Polar Area
  {
    title: 'Satisfacción del Cliente',
    typeGrafic: 'PolarArea',
    chartData: {
      labels: ['Calidad', 'Precio', 'Servicio', 'Entrega', 'Soporte'],
      datasets: [
        {
          data: [90, 80, 95, 85, 88],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    description: 'Niveles de satisfacción del cliente en diferentes aspectos del servicio.'
  },
  // Gráfico de Bubble
  {
    title: 'Rendimiento de Productos',
    typeGrafic: 'Bubble',
    chartData: {
      datasets: [
        {
          label: 'Producto A',
          data: [
            { x: 20, y: 30, r: 15 },
            { x: 40, y: 10, r: 10 },
            { x: 30, y: 20, r: 20 },
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
        },
        {
          label: 'Producto B',
          data: [
            { x: 10, y: 40, r: 10 },
            { x: 20, y: 30, r: 15 },
            { x: 15, y: 25, r: 25 },
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
        },
      ],
    },
    description: 'Rendimiento de productos según diferentes métricas (tamaño del círculo = volumen de ventas).'
  },
  // Gráfico de Scatter
  {
    title: 'Relación Precio-Calidad',
    typeGrafic: 'Scatter',
    chartData: {
      datasets: [
        {
          label: 'Productos Básicos',
          data: [
            { x: 10, y: 60 },
            { x: 15, y: 65 },
            { x: 12, y: 70 },
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
        },
        {
          label: 'Productos Premium',
          data: [
            { x: 25, y: 85 },
            { x: 30, y: 90 },
            { x: 28, y: 88 },
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
        },
      ],
    },
    description: 'Relación entre el precio y la percepción de calidad de los productos.'
  }
];

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

const Dashboard = () => {
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