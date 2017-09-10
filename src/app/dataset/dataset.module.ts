import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatasetComponent} from './dataset.component';
import {dataset_routing} from './dataset.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    dataset_routing,
    SharedModule
  ],
  declarations: [
    DatasetComponent
  ]
})
export class DatasetModule { }
