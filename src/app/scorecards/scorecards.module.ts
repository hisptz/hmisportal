import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {scorecard_routing} from './scorecards.routing';
import {SharedModule} from '../shared/shared.module';
import {ScorecardsComponent} from './scorecards.component';

@NgModule({
  imports: [
    CommonModule,
    scorecard_routing,
    SharedModule
  ],
  declarations: [
    ScorecardsComponent
  ]
})
export class ScorecardsModule { }
