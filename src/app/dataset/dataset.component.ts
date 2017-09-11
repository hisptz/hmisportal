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

@Component({
  moduleId: module.id,
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit, OnDestroy {

  years$: Observable<any[]>;
  quarters$: Observable<any[]>;
  organisationUnits$: Observable<any[]>;
  indicators: any = [];
  selected_ou: string;
  selected_ou_name: string;
  selected_pe: string;
  subscriptions: Subscription[] = [];
  dataset: any;
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
    this.store.select(selectors.getDashboardPeriod).take(1).subscribe( pe => this.selected_pe = pe);
    this.store.select(selectors.getSelectedOrganisationUnit).subscribe( ou => this.selected_ou_name = ou.name);
  }

  ngOnInit() {
    this.indicators = [
      {
        cardClass: 'col-sm-12 col-md-12',
        loading: true,
        hasError: false
      }
    ];
    this.activatedRouter.params.subscribe(
      (params: any) => {
        this.dataset = params['dataset'];
        this.updatePortal();
      });
  }

  updatePortal() {
    for (const subscr of this.subscriptions) {
      if (subscr) {
        subscr.unsubscribe();
      }
    }
    this.store.select(selectors.getDashboardPeriod).take(1).subscribe( (period) => {
      this.store.select(selectors.getSelectedOrganisationUnit).take(1).subscribe( (orgunit) => {
        this.portalService.getAnalyticsData(
          'api/dataSets/' + this.dataset + '.json?fields=id,name,shortName,dataElements[id,name]').subscribe(
          (data) => {
            this.indicators = [
              {
                title: data.name,
                data: _.map(data.dataElements, 'id').join(';'),
                cardClass: 'col-sm-12 col-md-12',
              }
              ];
            this.indicators.forEach( (item) => {
              item.loading = true;
              item.hasError = false;
              let url = 'api/analytics.json?dimension=dx:' + item.data;
              url += '&dimension=ou:' + this.portalService.getLevel(orgunit.level) + orgunit.id + '&filter=pe:' + period;
              this.subscriptions.push(
                this.portalService.getAnalyticsData(url).subscribe(
                  (analytics) => {
                    const tableConfiguration = {
                      title: item.title + ' - ' + orgunit.name + ' - ' + period,
                      rows: ['dx'],
                      columns: ['ou'],
                      displayList: false,
                    };
                    item.visualizerType = 'table';
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

  updateOrgunit(ou) {
    this.store.dispatch(new dataactions.SetSelectedOuAction(ou));
    this.updatePortal();
  }

  updatePeriod(pe) {
    this.store.dispatch(new dataactions.SetDashboardPerioAction(pe));
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
