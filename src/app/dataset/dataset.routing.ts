/**
 * Created by kelvin on 11/23/16.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DatasetComponent} from './dataset.component';

export const dataset_routing: ModuleWithProviders = RouterModule.forChild([
  { path: ':dataset', component: DatasetComponent }
]);
