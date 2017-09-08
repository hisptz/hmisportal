import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatasetComponent} from './dataset.component';
import {dotaset_routing} from './dataset.routing';

@NgModule({
  imports: [
    CommonModule,
    dotaset_routing
  ],
  declarations: [
    DatasetComponent
  ]
})
export class DatasetModule { }
