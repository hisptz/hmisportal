import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatasetComponent} from './dataset.component';
import {dataset_routing} from './dataset.routing';

@NgModule({
  imports: [
    CommonModule,
    dataset_routing
  ],
  declarations: [
    DatasetComponent
  ]
})
export class DatasetModule { }
