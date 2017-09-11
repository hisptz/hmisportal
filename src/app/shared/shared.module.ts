import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { TableTemplateComponent } from './table-template/table-template.component';
import { Ng2HighchartsModule } from 'ng2-highcharts';
import {PlaceholderComponent} from './placeholder/placeholder.component';

@NgModule({
  imports: [
    CommonModule,
    Ng2HighchartsModule,
    FormsModule
  ],
  declarations: [
    TableTemplateComponent,
    PlaceholderComponent
  ],
  exports: [
    TableTemplateComponent,
    Ng2HighchartsModule,
    PlaceholderComponent,
    FormsModule
  ]
})
export class SharedModule { }
