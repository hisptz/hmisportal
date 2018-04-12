import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/reducers/index';
import {Observable} from 'rxjs/Observable';
import {Indicator} from '../shared/models/indicator';
import * as indicatorSelectors from '../store/selectors/indicator.selectors';
import * as visualizationSelectors from '../store/selectors/visualization.selectors';
import * as indicatorGroupSelectors from '../store/selectors/indicatorGroup.selectors';
import {IndicatorGroup} from '../shared/models/indicatorGroup';
import {animate, style, transition, trigger} from '@angular/animations';
import {Visualization} from '../store/visualization/visualization.state';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0.2}),
        animate(400, style({opacity: 1}))
      ])
    ])
  ]
})
export class IndicatorsComponent implements OnInit {

  indicators$: Observable<Indicator[]>;
  visualizations$: Observable<Visualization[]>;
  indicator_group$: Observable<IndicatorGroup>;
  showSorting = false;
  constructor(private store: Store<ApplicationState>) {
    this.indicators$ = this.store.select(indicatorSelectors.selectedIndicators);
    this.visualizations$ = this.store.select(visualizationSelectors.selectedVisualizations);
    this.indicator_group$ = this.store.select(indicatorGroupSelectors.selectCurrentIndicatorGroup);
  }

  ngOnInit() {
  }

}
