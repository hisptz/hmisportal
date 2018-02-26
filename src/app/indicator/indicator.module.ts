import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndicatorComponent} from './indicator.component';
import {indicator_routing} from './indicator.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    indicator_routing,
    SharedModule
  ],
  declarations: [
    IndicatorComponent
  ]
})
export class IndicatorModule { }
