import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataPointTypes, ChartFormValues } from '../app.models';
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

  newChart(data: ChartFormValues) {
    const labels = this.getDataPoints(data.chartDataPoints, DataPointTypes.LABEL);
    const numbers = this.getDataPoints(data.chartDataPoints, DataPointTypes.NUMBER);
    const backgroundColors = this.getBackgroundColors(numbers.length);

    this._chart = new Chart('canvas', {
      type: data.chartType,
      data: {
        labels: labels,
        datasets: [
          {
          label: 'chart',
          data: numbers,
          backgroundColor: backgroundColors,
          borderColor: 'white',
          }
        ]
      }
    });
  }

  getBackgroundColors(amount: number) {
    const colors = [];

    for (let i = 0; i < amount; i++) {
      colors.push(this.getRandomColor());
    }

    return colors;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  // come back to creating data type for data input
  getDataPoints(data, prop: DataPointTypes) {
    const dataPoints = [];

    for (let i = 0, len = data.length; i < len; i++) {
      const curr = data[i];

      if (prop === DataPointTypes.LABEL) {
        dataPoints.push(curr.label);

      } else if (prop === DataPointTypes.NUMBER) {
        dataPoints.push(curr.number);
      }

    }

    return dataPoints;
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

}
