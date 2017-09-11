/**
 * Created by kelvin on 08/09/17.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FamilyPlaningComponent} from "./family-planing/family-planing.component";

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  { path: 'indicator', loadChildren: 'app/indicator/indicator.module#IndicatorModule' },
  { path: 'dataset', loadChildren: 'app/dataset/dataset.module#DatasetModule' },
  { path: 'downloads', loadChildren: 'app/downloads/downloads.module#DownloadsModule' },
  { path: 'updates', loadChildren: 'app/updates/updates.module#UpdatesModule' },
  { path: 'familyPlanningHome',  component: FamilyPlaningComponent },
  { path: '**', redirectTo: 'HomeComponent' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class PortalRoutingModule { }
