import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {IndicatorsComponent} from './indicators/indicators.component';
import {DatasetComponent} from './dataset/dataset.component';
import {ResourcesComponent} from './resources/resources.component';
import {ScorecardsComponent} from './scorecards/scorecards.component';
import {UpdatesComponent} from './updates/updates.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'indicators/:indicatorid',
    component: IndicatorsComponent,
  },
  {
    path: 'dataset/:datasetid',
    component: DatasetComponent,
  },
  {
    path: 'resources',
    component: ResourcesComponent,
  },
  {
    path: 'scorecards',
    component: ScorecardsComponent,
  },
  {
    path: 'update',
    component: UpdatesComponent,
  }, {
    path: '**',
    component: HomeComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
