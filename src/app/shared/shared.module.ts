import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';
import { TableTemplateComponent } from './table-template/table-template.component';
import { ChartTemplateComponent } from './chart-template/chart-template.component';
import { Ng2HighchartsModule } from 'ng2-highcharts';
import {PlaceholderComponent} from './placeholder/placeholder.component';

@NgModule({
  imports: [
    CommonModule,
    Ng2HighchartsModule,
    FormsModule
  ],
  declarations: [
    FiltersComponent,
    TableTemplateComponent,
    ChartTemplateComponent,
    PlaceholderComponent
  ],
  exports: [
    FiltersComponent,
    TableTemplateComponent,
    ChartTemplateComponent,
    Ng2HighchartsModule,
    PlaceholderComponent,
    FormsModule
  ]
})
export class SharedModule { }
