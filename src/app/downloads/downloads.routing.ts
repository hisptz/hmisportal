/**
 * Created by kelvin on 11/23/16.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DownloadsComponent} from './downloads.component';

export const downloads_routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: DownloadsComponent }
]);
