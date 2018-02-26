/**
 * Created by kelvin on 11/23/16.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import {IndicatorComponent} from './indicator.component';

export const indicator_routing: ModuleWithProviders = RouterModule.forChild([
  { path: ':indicatorid', component: IndicatorComponent }
]);
