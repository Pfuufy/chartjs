import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { TransferDataService } from 'src/app/transfer-data.service';
import { ChartTypes } from '../../app.models';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-smart-chart-form',
  templateUrl: './smart-chart-form.component.html',
  styleUrls: ['./smart-chart-form.component.css']
})
export class SmartChartFormComponent implements OnInit, OnDestroy {

  chartForm: FormGroup;

  displayExtraFormInputs = false;
  displayBarAndLineInputs = false;
  displayNormalInputs = false;
  displayMultiPlotInputBtn = false;
  displayMultiPlotInputs = false;
  displaySubmitBtn = false;

  private _subs = new Subscription();

  constructor(private fb: FormBuilder, private transferDataService: TransferDataService) { }

  ngOnInit() {
    this.initChartForm();
    this.listenForFormChanges();
  }

  initChartForm(): void {
    this.chartForm = this.fb.group({
      chartType: null,
      chartBckgColor: null,
      chartBorderColor: null,
      chartXLabels: this.fb.array([]),
      chartDataPlots: this.fb.array([]),
      chartDataPoints: this.fb.array([])
    });
  }

  listenForFormChanges(): void {
    this._subs.add(

      this.chartForm.valueChanges.subscribe(

        (change) => this.handleFormChange()

      )
    );
  }

  handleFormChange(): void {
    const chartType = this.chartForm.value.chartType;

    if (chartType === ChartTypes.BAR || chartType === ChartTypes.LINE) {
      this.handleBarOrLineChart();

    } else {
      this.handleOtherTypeChart();
    }

  }

  handleBarOrLineChart(): void {
    this.displayMultiPlotInputBtn = false;
    this.displayBarAndLineInputs = true;
    this.displaySubmitBtn = true;

    if (this.displayExtraFormInputs) {
      this.displayMultiPlotInputBtn = true;
    }

    if (!this.displayExtraFormInputs) {
      this.displayNormalInputs = true;
    }
  }

  handleOtherTypeChart(): void {
    this.displayBarAndLineInputs = false;
    this.displayExtraFormInputs = false;
    this.displayMultiPlotInputBtn = false;
    this.displayMultiPlotInputs = false;
    this.displaySubmitBtn = true;
    this.displayNormalInputs = true;

    if (this.chartXLabels.length > 0) {
      this.clearFormArray(this.chartXLabels);
      this.clearFormArray(this.chartDataPlots);
    }
  }

  toggleMultipleDataPlots(): void {
    this.displayExtraFormInputs = !this.displayExtraFormInputs;

    if (this.displayExtraFormInputs) {
      this.displayNormalInputs = false;
      this.displayMultiPlotInputBtn = true;

    } else {
      this.displayMultiPlotInputBtn = false;
      this.displayMultiPlotInputs = false;
      this.displayMultiPlotInputBtn = false;
      this.displayNormalInputs = true;
    }

  }

  get chartXLabels() {
    return this.chartForm.get('chartXLabels') as FormArray;
  }

  get chartDataPlots() {
    return this.chartForm.get('chartDataPlots') as FormArray;
  }

  get chartDataPoints() {
    return this.chartForm.get('chartDataPoints') as FormArray;
  }

  clearFormArray(arr: FormArray) {
    for (let i = 0, len = arr.length; i < len; i++) {
      arr.removeAt(i);
    }
  }

  addXLabel(): void {
    this.chartXLabels.push(
      this.fb.group({
        label: null
      })
    );
  }

  addDataPlot(): void {
    this.chartDataPlots.push(
      this.fb.group({
        dataPlot: null
      })
    );

    this.chartDataPoints.push(
      this.fb.array([])
    );
  }

  addDataPoint(): void {
    this.chartDataPoints.push(
      this.fb.group({
        label: null,
        number: null
      })
    );
  }

  deleteXLabel(index: number): void {
    this.chartXLabels.removeAt(index);
  }

  deleteDataPlot(index: number): void {
    this.chartDataPlots.removeAt(index);
    this.chartDataPoints.removeAt(index);
  }

  deleteDataPoint(index: number): void {
    this.chartDataPoints.removeAt(index);
  }

  chartFormSubmitted(chartForm: FormGroup): void {
    console.log(chartForm.value);
    this.transferDataService.sendDataToChart(chartForm.value);
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

}
