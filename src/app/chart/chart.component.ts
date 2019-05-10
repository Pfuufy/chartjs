import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChartFormValues, ChartDataObject, MetricGroup, ChartTypes } from '../app.models';
import { TransferDataService } from '../transfer-data.service';

import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

    private _chart;
    private _subs = new Subscription();

    constructor(private transferDataService: TransferDataService) {}

    ngOnInit() {
        this.listenForChartData();
    }

    listenForChartData(): void {
        this._subs.add(

            this.transferDataService.chartDataObservable.subscribe(

                (data: ChartFormValues) => {

                // receives initial null value
                    if (data) {
                        this.getDataSets(data);

                        if (this._chart) {
                            this._chart.destroy();
                            this.newChart(data);

                        } else {
                            this.newChart(data);
                        }

                    }

                },

                (error: Error) => console.log('Error: ', error)

            )

        );
    }

    newChart(data: ChartFormValues): void {
        const type = data.chartType;
        const labels = this.getLabels(data);
        const dataSets = this.getDataSets(data);

        this._chart = new Chart('canvas', {
            type: type,
            data: {
                labels: labels,
                datasets: dataSets
            }
        });
    }

    getLabels(data: ChartFormValues): string[] {
        const labels = [];

        for (let i = 0, len = data.xAxisData.length; i < len; i++) {
            const curr = data.xAxisData[i];
            labels.push(curr.xLabel);
        }

        return labels;
    }

    getDataSets(data: ChartFormValues): ChartDataObject[] {
        let metricLabels: string[];
        let metricValues: number[];
        const dataSets = [];
        const valsArr = [];

        const xAxisData = data.xAxisData;

        for (let i = 0, len = xAxisData.length; i < len; i++) {
            const labelData = xAxisData[i].data;

            for (let j = 0, leng = labelData.length; j < leng; j++) {
                const vals = labelData[j];

                valsArr.push(vals);
            }
        }

        [metricLabels, metricValues] = this.createMetricArrs(valsArr);

        for (let i = 0, len = metricLabels.length; i < len; i++) {
            const dataSet = this.createDataSet(data.chartType, metricLabels, metricValues, i);

            dataSets.push(dataSet);
        }

        return dataSets;
    }

    createMetricArrs(vals: MetricGroup[]): any[] {
        const metricLabels = [];
        const metricValues = [];

        for (let i = 0, len = vals.length; i < len; i++) {
            const curr = vals[i];
            const label = curr.metricLabel;
            const value = curr.metricValue;

            if (!metricLabels.includes(label)) {
                metricLabels.push(label);
                metricValues[metricLabels.indexOf(label)] = [];
                metricValues[metricLabels.indexOf(label)].push(value);
            } else {
                metricValues[metricLabels.indexOf(label)].push(value);
            }
        }

        return [metricLabels, metricValues];
    }

    createDataSet(
        chartType: string,
        metricLabels: string[],
        metricValues: number[],
        i: number
        ): ChartDataObject {

        const color = this.getRandomColor();

        const dataSet = {
            label: null,
            data: null,
            backgroundColor: color,
            borderColor: color,
            fill: chartType === ChartTypes.LINE ? false : true
        };

        dataSet.label = metricLabels[i];
        dataSet.data = metricValues[i];

        return dataSet;
    }

    getBackgroundColors(amount: number): string[] {
        const colors = [];

        for (let i = 0; i < amount; i++) {
            colors.push(this.getRandomColor());
        }

        return colors;
    }

    getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    ngOnDestroy() {
        this._subs.unsubscribe();
    }

}
