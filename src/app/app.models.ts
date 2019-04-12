export interface ChartFormValues {
    chartName: string;
    chartType: string;
    xAxisData: XAxisData[];
}

export interface XAxisData {
    xLabel: string;
    data: MetricGroup[];
}

export interface MetricGroup {
    metricLabel: string;
    metricValue: number;
}

export interface ChartDataObject {
    label: string;
    data: [];
    backgroundColor: string;
    borderColor: string;
}

export enum DataPointTypes {
    LABEL = 'LABEL',
    NUMBER = 'NUMBER'
}

export enum ChartTypes {
    BAR = 'bar',
    LINE = 'line',
    DOUGHNUT = 'doughnut',
    PIE = 'pie',
    POLARAREA = 'polarArea'
}
