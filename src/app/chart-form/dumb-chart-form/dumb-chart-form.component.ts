import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dumb-chart-form',
  templateUrl: './dumb-chart-form.component.html',
  styles: [
    '.formControl { margin-top: 10px; }'
  ]
})
export class DumbChartFormComponent implements OnInit {

  @Input() chartForm: FormGroup;
  @Input() displayExtraFormInputs: boolean;
  @Input() displayBarAndLineInputs: boolean;
  @Input() displayNormalInputs: boolean;
  @Input() displayMultiPlotInputBtn: boolean;
  @Input() displayMultiPlotInputs: boolean;
  @Input() displaySubmitBtn: boolean;

  @Output() toggleMultipleDataPlots = new EventEmitter();
  @Output() addXLabel = new EventEmitter();
  @Output() addDataPlot = new EventEmitter();
  @Output() addDataPoint = new EventEmitter();
  @Output() deleteXLabel = new EventEmitter<number>();
  @Output() deleteDataPlot = new EventEmitter<number>();
  @Output() deleteDataPoint = new EventEmitter<number>();
  @Output() chartFormSubmitted = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit() {
  }

}
