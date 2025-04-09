import { darkenColor } from "./darkenColor";
import { Grafic } from '@/types/Grafic';

const colors = ['#3A6D8C', '#6A9AB0', '#4F959D', '#72BAA9', '#608BC1', '#27667B', '#4D55CC', '#578FCA', '#3674B5'];

export const addColorsToGrafics = (grafics: Grafic[]): Grafic[] => {
    return grafics.map((grafic) => {
      const newGrafic = JSON.parse(JSON.stringify(grafic)) as Grafic;
      newGrafic.chartData.datasets = newGrafic.chartData.datasets.map((dataset, datasetIndex) => {
        const numDataPoints = dataset.data.length;
        const colorIndex = datasetIndex % colors.length;
    
        if (numDataPoints === 1) {
          dataset.backgroundColor = colors[colorIndex];
          dataset.borderColor = darkenColor(colors[colorIndex], 20); // Función opcional para oscurecer
        } else {
          dataset.backgroundColor = Array(numDataPoints)
            .fill(null)
            .map((_, i) => colors[(colorIndex + i) % colors.length]);
          dataset.borderColor = dataset.backgroundColor.map(color => darkenColor(color, 20));
        }

        return dataset;
      });
      
      return newGrafic;
    });
};