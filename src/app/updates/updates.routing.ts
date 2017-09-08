/**
 * Created by kelvin on 11/23/16.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import {UpdatesComponent} from './updates.component';

export const updates_routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: UpdatesComponent }
]);
