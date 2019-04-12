import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataPointTypes, ChartFormValues, ChartDataObject } from '../app.models';
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

    getDataSets(data: ChartFormValues) {

        const metricLabels = [];
        const metricValues = [];
        const dataSets = [];

        const xAxisData = data.xAxisData;

        for (let i = 0, len = xAxisData.length; i < len; i++) {
            const data = xAxisData[i].data;

            for (let j = 0, leng = data.length; j < leng; j++) {
                const vals = data[j];
                const label = vals.metricLabel;
                const value = vals.metricValue;

                if (!metricLabels.includes(label)) {
                    metricLabels.push(label);
                    metricValues[metricLabels.indexOf(label)] = [];
                    metricValues[metricLabels.indexOf(label)].push(value);
                } else {
                    metricValues[metricLabels.indexOf(label)].push(value);
                }
            }
        }

        for (let i = 0, len = metricLabels.length; i < len; i++) {
            const dataSet = {
                label: null,
                data: null,
                backgroundColor: this.getRandomColor(),
                borderColor: 'white'
            };

            dataSet.label = metricLabels[i];
            dataSet.data = metricValues[i];

            dataSets.push(dataSet);
        }

        return dataSets;
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
