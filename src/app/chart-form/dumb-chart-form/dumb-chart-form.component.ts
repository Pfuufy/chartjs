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

  @Output() addDataPoint = new EventEmitter();
  @Output() deleteDataPoint = new EventEmitter<number>();
  @Output() chartFormSubmitted = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit() {
  }

}
