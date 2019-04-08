import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { TransferDataService } from 'src/app/transfer-data.service';

@Component({
    selector: 'app-smart-chart-form',
    templateUrl: './smart-chart-form.component.html',
    styleUrls: ['./smart-chart-form.component.css']
})
export class SmartChartFormComponent implements OnInit {

    chartForm: FormGroup;

    _numOfMetrics = 1;

    constructor(private fb: FormBuilder, private transferDataService: TransferDataService) { }

    ngOnInit() {
        this.initChartForm();
    }

    initChartForm(): void {
        this.chartForm = this.fb.group({
            chartName: null,
            chartType: null,
            xAxisData: this.fb.array([
                this.fb.group({
                    xLabel: null,
                    data: this.fb.array([
                        this.fb.group({
                            metricLabel: null,
                            metricValue: null
                        })
                    ])
                })
            ])
        });
    }

    get xAxisData(): FormArray {
        return this.chartForm.get('xAxisData') as FormArray;
    }

    addXAxisData(): void {
        this.xAxisData.push(this.newXAxisData());

        this.addMetrics();
    }

    addMetrics(): void {
        for (let i = 0; i < this._numOfMetrics; i++) {
            this.xAxisData.controls[this.xAxisData.length - 1]['controls'].data.push(this.newMetricGroup());
        }
    }

    newXAxisData(): FormGroup {
        return this.fb.group({
                    xLabel: null,
                    data: this.fb.array([])
                });
    }

    addMetricToAllXLabels(): void {
        for (let i = 0, len = this.xAxisData.length; i < len; i++) {
            const curr = this.xAxisData.controls[i]['controls'].data;
            curr.push(this.newMetricGroup());
        }

        this._numOfMetrics += 1;
    }

    newMetricGroup(): FormGroup {
        return this.fb.group({
                    metricLabel: null,
                    metricValue: null
                });
    }

    deleteMetric(): void {
        for (let i = 0, len = this.xAxisData.length; i < len; i++) {
            const curr = this.xAxisData.controls[i]['controls'].data;
            curr.removeAt(-1);
        }

        this._numOfMetrics -= 1;
    }

    deleteXAxisData(index: number): void {
        this.xAxisData.removeAt(index);
    }

    clearFormArray(arr: FormArray) {
        for (let i = 0, len = arr.length; i < len; i++) {
            arr.removeAt(i);
        }
    }

    chartFormSubmitted(chartForm: FormGroup): void {
        this.transferDataService.sendDataToChart(chartForm.value);
    }

}
