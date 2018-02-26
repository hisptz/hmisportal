/**
 * Created by kelvin on 11/23/16.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ScorecardsComponent} from './scorecards.component';

export const scorecard_routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: ScorecardsComponent }
]);
