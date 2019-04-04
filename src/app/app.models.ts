export interface ChartFormValues {
    chartType: string;
    chartLabel: string;
    chartDataPoints: string;
    chartBckgColor: string;
    chartBorderColor: string;
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
