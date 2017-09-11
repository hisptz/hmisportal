import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application.state';
import {Observable} from 'rxjs/Observable';
import * as selectors from '../store/selectors';
import * as dataactions from '../store/actions/store.data.action';
import 'rxjs/add/operator/take';
import {PortalService} from '../shared/services/portal.service';
import {VisualizerService} from '../shared/services/visualizer.service';

import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CHART_TYPES} from "../shared/chart_types";

@Component({
  moduleId: module.id,
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit, OnDestroy  {

  years$: Observable<any[]>;
  quarters$: Observable<any[]>;
  organisationUnits$: Observable<any[]>;
  indicators: any = [];
  selected_ou: string;
  selected_ou_name: string;
  selected_pe: string;
  subscriptions: Subscription[] = [];
  chartTypes = CHART_TYPES;
  constructor(
    private store: Store<ApplicationState>,
    private portalService: PortalService,
    private viualizer: VisualizerService,
    private activatedRouter: ActivatedRoute,
  ) {
    this.years$ = this.store.select(selectors.getYears);
    this.quarters$ = this.store.select(selectors.getQuarters);
    this.organisationUnits$ = this.store.select(selectors.getOrganisationUnits);
    this.store.select(selectors.getSelectedOrgunit).take(1).subscribe( ou => this.selected_ou = ou);
    this.store.select(selectors.getNormalPeriod).take(1).subscribe( pe => this.selected_pe = pe);
    this.store.select(selectors.getSelectedOrganisationUnit).subscribe( ou => this.selected_ou_name = ou.name);
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(
      (params: any) => {
        this.store.dispatch(new dataactions.SetPageAction(params['indicatorid']));
        this.updatePortal();
      });
  }

  updatePortal() {
    for (const subscr of this.subscriptions) {
      if (subscr) {
        subscr.unsubscribe();
      }
    }
    this.store.select(selectors.getNormalPeriod).take(1).subscribe( (period) => {
      this.store.select(selectors.getSelectedOrganisationUnit).take(1).subscribe( (orgunit) => {
        this.store.select(selectors.getPortalItems).take(1).subscribe(
          (data) => {
            this.indicators = data;
            this.indicators.forEach( (item) => {
              item.loading = true;
              item.showOptions = false;
              item.hasError = false;
              let url = 'api/analytics.json?dimension=dx:' + item.data;
              url += '&dimension=ou:' + this.portalService.getLevel(orgunit.level) + orgunit.id + '&filter=pe:' + period;
              item.csv = url.replace('.json', '.csv');
              item.csv = '../dhis/' + item.csv;
              this.subscriptions.push(
                this.portalService.getAnalyticsData(url).subscribe(
                  (analytics) => {
                    const chartConfiguration = {
                      type: item.chart,
                      title: item.title + ' - ' + orgunit.name + ' - ' + period,
                      xAxisType: 'ou',
                      yAxisType: 'dx',
                      show_labels: false
                    };
                    const tableConfiguration = {
                      title: item.title + ' - ' + orgunit.name + ' - ' + period,
                      rows: ['ou'],
                      columns: ['dx'],
                      displayList: false,
                    };
                    item.visualizerType = (item.visualizerType) ? item.visualizerType : 'chart';
                    item.analytics = analytics;
                    item.chartObject = this.viualizer.drawChart(analytics, chartConfiguration);
                    item.tableObject = this.viualizer.drawTable(analytics, tableConfiguration);
                    item.loading =  false;
                  },
                  error => {
                    item.loading = false;
                    item.hasError = true;
                  }
                )
              );
            });
          }
        );
      });
    });
  }

  updateType(type, item) {
    item.visualizerType = type;
  }

  setOptions(type, item) {
    item.showOptions = type;
  }

  updateChartType(type, item) {
    item.chart = type;
    const chartConfiguration = {
      type: item.chart,
      title: item.title,
      xAxisType: 'ou',
      yAxisType: 'dx',
      show_labels: false
    };
    item.chartObject = this.viualizer.drawChart(item.analytics, chartConfiguration);
  }

  updateOrgunit(ou) {
    this.store.dispatch(new dataactions.SetSelectedOuAction(ou));
    this.updatePortal();
  }

  updatePeriod(pe) {
    this.store.dispatch(new dataactions.SetSelectedPeriodAction(pe));
    this.updatePortal();
  }

  // Use this for all clean ups
  ngOnDestroy() {
    for (const subscr of this.subscriptions) {
      if (subscr) {
        subscr.unsubscribe();
      }
    }
  }

}
