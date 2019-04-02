import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { SmartChartFormComponent } from './chart-form/smart-chart-form/smart-chart-form.component';
import { DumbChartFormComponent } from './chart-form/dumb-chart-form/dumb-chart-form.component';
import { TransferDataService } from './transfer-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SmartChartFormComponent,
    DumbChartFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [TransferDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
