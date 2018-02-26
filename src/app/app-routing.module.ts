/**
 * Created by kelvin on 08/09/17.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FamilyPlaningComponent} from './family-planing/family-planing.component';
import {IndicatorComponent} from './indicator/indicator.component';
import {DatasetComponent} from './dataset/dataset.component';
import {DownloadsComponent} from './downloads/downloads.component';
import {UpdatesComponent} from './updates/updates.component';
import {ScorecardsComponent} from './scorecards/scorecards.component';

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  { path: 'indicator/:indicatorid', component: IndicatorComponent },
  { path: 'dataset/:dataset', component: DatasetComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'updates', component: UpdatesComponent },
  { path: 'scorecards', component: ScorecardsComponent },
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
