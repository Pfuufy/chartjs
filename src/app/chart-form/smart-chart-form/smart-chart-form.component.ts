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

  constructor(private fb: FormBuilder, private transferDataService: TransferDataService) { }

  ngOnInit() {
    this.initChartForm();
  }

  initChartForm(): void {
    this.chartForm = this.fb.group({
      chartType: [null, Validators.required],
      chartBckgColor: [null],
      chartBorderColor: [null],
      chartDataPoints: this.fb.array([], Validators.required)
    });
  }

  get chartDataPoints() {
    return this.chartForm.get('chartDataPoints') as FormArray;
  }

  addDataPoint() {
    this.chartDataPoints.push(
      this.fb.group({
        label: [null, Validators.required],
        number: [null, Validators.required]
      })
    );
  }

  deleteDataPoint(index: number) {
    this.chartDataPoints.removeAt(index);
  }

  chartFormSubmitted(chartForm: FormGroup): void {
    this.transferDataService.sendDataToChart(chartForm.value);
  }

}
