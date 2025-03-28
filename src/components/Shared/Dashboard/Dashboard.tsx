"use client";
import React from 'react';
import styled from 'styled-components';
import { Bar, Line } from 'react-chartjs-2';
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
  Filler
} from 'chart.js';

// Registramos los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Estilos generales del dashboard
const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 15px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  grid-column: 1 / -1;
`;

// Componente Card para KPIs
const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h3`
  color: #7f8c8d;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const CardValue = styled.div`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

// Fix the TypeScript error by properly typing the props
interface CardChangeProps {
  positive?: boolean;
  children: React.ReactNode;
}

const CardChange = styled.div<CardChangeProps>`
  color: ${props => props.positive ? '#27ae60' : '#e74c3c'};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

// Estilos para los gráficos
const ChartContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChartDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 15px;
  line-height: 1.4;
`;

// Datos para los gráficos (simulados)
const barChartData = {
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
};

const lineChartData = {
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
};

const areaChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Ingresos',
      data: [5000, 7000, 6500, 9000],
      borderColor: 'rgba(155, 89, 182, 1)',
      backgroundColor: 'rgba(155, 89, 182, 0.2)',
      tension: 0.3,
      fill: true,
    },
    {
      label: 'Beneficios',
      data: [2000, 3500, 3000, 4500],
      borderColor: 'rgba(52, 152, 219, 1)',
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      tension: 0.3,
      fill: true,
    },
  ],
};

// Opciones comunes para los gráficos
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
      <CardContainer>
        <Card>
          <CardTitle>Operaciones exitosas</CardTitle>
          <CardValue>100</CardValue>
          <CardChange positive>
            ↑ 12% desde el mes pasado
          </CardChange>
        </Card>
        
        <Card>
          <CardTitle>Operaciones fallidas</CardTitle>
          <CardValue>15</CardValue>
          <CardChange positive={false}>
            ↓ 5% desde el mes pasado
          </CardChange>
        </Card>
        
        <Card>
          <CardTitle>Tiempo promedio</CardTitle>
          <CardValue>2.4s</CardValue>
          <CardChange positive>
            ↓ 0.8s desde la última semana
          </CardChange>
        </Card>
        
        <Card>
          <CardTitle>Satisfacción del cliente</CardTitle>
          <CardValue>94%</CardValue>
          <CardChange positive>
            ↑ 3% desde el último trimestre
          </CardChange>
        </Card>
      </CardContainer>

      <ChartContainer>
        <SectionTitle>Comparación Mensual</SectionTitle>
        <div style={{ height: '300px' }}>
          <Bar data={barChartData} options={chartOptions} />
        </div>
        <ChartDescription>
          Este gráfico de barras muestra la comparación entre ventas y gastos durante el primer semestre del año.
          Permite identificar meses con mejor rendimiento y relación coste-beneficio.
        </ChartDescription>
      </ChartContainer>

      <ChartContainer>
        <SectionTitle>Tendencia Semanal</SectionTitle>
        <div style={{ height: '300px' }}>
          <Line data={lineChartData} options={chartOptions} />
        </div>
        <ChartDescription>
          El gráfico de líneas muestra la fluctuación de usuarios activos durante la semana.
          Los fines de semana suelen mostrar un aumento en la actividad de los usuarios.
        </ChartDescription>
      </ChartContainer>

      <ChartContainer>
        <SectionTitle>Análisis Trimestral</SectionTitle>
        <div style={{ height: '300px' }}>
          <Line data={areaChartData} options={chartOptions} />
        </div>
        <ChartDescription>
          Este gráfico de áreas representa los ingresos y beneficios por trimestre.
          Las áreas sombreadas permiten visualizar fácilmente la diferencia entre ambos conceptos.
        </ChartDescription>
      </ChartContainer>
    </DashboardContainer>
  );
};

export default Dashboard;