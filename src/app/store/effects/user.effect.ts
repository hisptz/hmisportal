import {Injectable} from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {LOAD_USER, LoadUserFailure, LoadUserSuccess} from '../actions/user.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { HttpClientService } from '../../shared/services/http-client.service';
import * as portaActions from '../actions/portal.actions';
import * as menuActions from '../actions/menu.actions';
import * as indicatorActions from '../actions/indicator.actions';
import * as visualizationActions from '../actions/visualization.actions';
import * as indicatorGroupActions from '../actions/indicatorGroup.actions';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../reducers/index';
import { PortalState } from '../reducers/portal.reducer';
import { PortalMenu } from '../../shared/models/menu';
import { protractor } from 'protractor/built/ptor';
import { IndicatorGroup } from '../../shared/models/indicatorGroup';
import { Dictionary } from '@ngrx/entity/src/models';
import * as _ from 'lodash';
import { validateConfig } from '@angular/router/src/config';
import {Indicator} from '../../shared/models/indicator';
import {mapDashboardItemToVisualization} from '../visualization/helpers/map-dashboad-item-to-visualization.helper';
import {Visualization} from '../visualization/visualization.state';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClientService,
    private store: Store<ApplicationState>
  ) { }

  @Effect()
  loadUser$ = this.actions$.ofType(LOAD_USER).pipe(
    switchMap( () => {
      return this.http.get('me.json?fields=id,name,email,organisationUnits[id,name],dataViewOrganisationUnits[id,name]').pipe(
        map( (user) => new LoadUserSuccess(user)),
        catchError(error => of(new LoadUserFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  loadPortal$ = this.actions$.ofType(portaActions.LOAD_PORTAL).pipe(
    tap(() => {
      this.http.get('dataStore/portal/basic').subscribe(
        (result: PortalState) => {
          // set basic information
          this.store.dispatch(new portaActions.SetTitle(result.title));
          this.store.dispatch(new portaActions.SetQuarter(result.last_quarter));
          this.store.dispatch(new portaActions.SetYear(result.last_year));
          this.store.dispatch(new portaActions.SetMenu(result.mainmenus.map(menu => menu.id)));
          // set mainmenu details
          result.mainmenus.forEach((menu => {
            this.uploadMenu(menu);
          }));
        }
      );
    })
  );

  // Load indicators
  @Effect({ dispatch: false })
  loadIndicators$ = this.actions$.ofType(portaActions.LOAD_PORTAL).pipe(
    tap(() => {
      this.http.get('dataStore/portal/indicators').subscribe(
        (result) => {
          _.forOwn(result, (indicators, key) => {
            const group: IndicatorGroup = {
              id: key,
              title: key,
              indicators: indicators.map(indicator => indicator.id)
            };
            const visualizations: Visualization[] = indicators.map((indicator: Indicator) => mapDashboardItemToVisualization(indicator));
            this.store.dispatch(new indicatorGroupActions.AddIndicatorGroup({indicatorGroup: group}));
            this.store.dispatch(new indicatorActions.AddIndicators({indicators}));
            this.store.dispatch(new visualizationActions.AddVisualizations({visualizations}));
          });
        }
      );
    })
  );

  // Load dashboard items
  @Effect({ dispatch: false })
  loadDashboard$ = this.actions$.ofType(portaActions.LOAD_PORTAL).pipe(
    tap(() => {
      this.http.get('dataStore/portal/dashboard').subscribe(
        (indicators) => {
          const group: IndicatorGroup = {
            id: 'dashboard',
            title: 'dashboard',
            indicators: indicators.map(indicator => indicator.id)
          };
          const visualizations: Visualization[] = indicators.map((indicator: Indicator) => mapDashboardItemToVisualization(indicator));
          this.store.dispatch(new indicatorGroupActions.AddIndicatorGroup({indicatorGroup: group}));
          this.store.dispatch(new indicatorActions.AddIndicators({indicators}));
          this.store.dispatch(new visualizationActions.AddVisualizations({visualizations}));
        }
      );
    })
  );

  // this function helps to recursively set the menu models
  uploadMenu(menu: PortalMenu) {
    let submenus = [];
    if ( menu.hasOwnProperty('submenu') ) {
      submenus = menu.submenu.map(m => m.id);
      menu.submenu.forEach(item => {
          this.uploadMenu(item);
      });
    }
    const portalMenu = {
      id: menu.id,
      type: menu.type,
      name: menu.name,
      has_submenu: menu.has_submenu,
      submenusId: submenus
    };
    this.store.dispatch(new menuActions.AddMenu({menu: portalMenu}));
  }
}
