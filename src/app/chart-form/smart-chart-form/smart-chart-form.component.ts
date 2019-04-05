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

  private _subs = new Subscription();

  constructor(private fb: FormBuilder, private transferDataService: TransferDataService) { }

  ngOnInit() {
    this.initChartForm();
    this.listenForFormChanges();
  }

  initChartForm(): void {
    this.chartForm = this.fb.group({
      chartName: null,
      chartType: null,
      xAxisData: this.fb.array([])
    });
  }

  listenForFormChanges(): void {
    this._subs.add(

      this.chartForm.valueChanges.subscribe(

        (change) => this.handleFormChange()

      )
    );
  }

  handleFormChange(): void {}

  get xAxisData() {
    return this.chartForm.get('xAxisData') as FormArray;
  }

  addXAxisData(): void {
    this.xAxisData.push(
      this.fb.group({
        xLabel: null,
        data: this.fb.array([])
      })
    );
  }

  deleteXLabel(index: number): void {
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

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

}
