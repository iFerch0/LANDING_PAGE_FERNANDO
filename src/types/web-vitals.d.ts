declare module 'web-vitals' {
  export type Metric = {
    name: string;
    value: number;
    delta?: number;
    id?: string;
    entries?: PerformanceEntry[];
  };
  export function getCLS(onReport: (metric: Metric) => void): void;
  export function getFID(onReport: (metric: Metric) => void): void;
  export function getLCP(onReport: (metric: Metric) => void): void;
  export function getINP(onReport: (metric: Metric) => void): void;
  export function getFCP(onReport: (metric: Metric) => void): void;
}
