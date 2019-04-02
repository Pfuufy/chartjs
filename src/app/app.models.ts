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
