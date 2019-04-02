import { Injectable } from '@angular/core';

import { ChartFormValues } from './app.models';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {
  private _chartData = new BehaviorSubject<ChartFormValues>(null);

  chartDataObservable = this._chartData.asObservable();

  constructor() { }

  sendDataToChart(chartData: ChartFormValues) {
    this._chartData.next(chartData);
  }
}
