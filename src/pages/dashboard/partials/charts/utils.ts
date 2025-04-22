import { ChartConfig } from '@/components/ui/chart';
import { PerformanceStat } from '@/types/performance-stat';
import { chartColors } from './colors';

const capitalizeFirstLetter = (value: string) => {
  const [text] = value.split(' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
};

type ChartConfigRaw = {
  config: ChartConfig;
  labels: string[];
};

export const getConfig = (data?: PerformanceStat[]): ChartConfigRaw => {
  if (!data) {
    return { config: {} satisfies ChartConfig, labels: [] };
  }

  const labels = [
    ...new Set(data.flatMap((i) => Object.keys(i.values))).values(),
  ];
  // Percorre todos os values do stat para puxar as labels

  const config = labels.reduce((acc: Record<string, any>, label: string) => {
    const key = `values.${label}`;

    if (!acc[key]) {
      acc[key] = {
        label: capitalizeFirstLetter(label),
        color: getColor(),
      };
    }

    return acc;
  }, {}) satisfies ChartConfig;

  return { config, labels: labels.map((label) => `values.${label}`) };
};

export const getColor = () => {
  const colors = Object.values(chartColors);

  if (!colors.length) return null; // Retorna null se o array estiver vazio

  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
};
