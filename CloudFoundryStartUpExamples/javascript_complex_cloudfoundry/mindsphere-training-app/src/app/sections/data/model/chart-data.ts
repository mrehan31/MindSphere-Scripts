import { ChartDataPoint } from './chart-data-point';

export interface ChartData {
    data: ChartDataPoint[];
    name: string;
    unit: string;
    timeUnit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
}
