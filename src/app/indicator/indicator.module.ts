import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndicatorComponent} from './indicator.component';
import {indicator_routing} from './indicator.routing';

@NgModule({
  imports: [
    CommonModule,
    indicator_routing
  ],
  declarations: [
    IndicatorComponent
  ]
})
export class IndicatorModule { }
