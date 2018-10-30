import { Component, OnInit } from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../animations/router-animation';

@Component({
  selector: 'app-statistic-summary',
  templateUrl: './statistic-summary.component.html',
  styleUrls: ['./statistic-summary.component.scss']
})
export class StatisticSummaryComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor() { }

  ngOnInit() {
  }

}
