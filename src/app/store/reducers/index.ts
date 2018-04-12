import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromMenu from './menu.reducer';
import * as fromPortal from './portal.reducer';
import * as fromIndicator from './indicator.reducer';
import * as fromVisualization from './visualization.reducer';
import * as fromIndicatorGroup from './indicatorGroup.reducer';
import {uiReducer, UiState} from './ui.reducer';
import {RouterStateUrl} from './router.reducer';
import {environment} from '../../../environments/environment';
import {userReducer, UserState} from './user.reducer';
import {storeFreeze} from 'ngrx-store-freeze';

export  interface ApplicationState {
  user: UserState;
  uiState: UiState;
  indicators: fromIndicator.State;
  indicatorGroups: fromIndicatorGroup.State;
  portal: fromPortal.PortalState;
  menus: fromMenu.State;
  visualizations: fromVisualization.State;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}
export const reducers: ActionReducerMap<ApplicationState> = {
  user: userReducer,
  uiState: uiReducer,
  indicators: fromIndicator.reducer,
  indicatorGroups: fromIndicatorGroup.reducer,
  portal: fromPortal.portalReducer,
  menus: fromMenu.reducer,
  visualizations: fromVisualization.reducer,
  routerReducer: fromRouter.routerReducer,
};

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production ? [storeFreeze] : [];

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');
export const getUiState = createFeatureSelector<UiState>('uiState');
export const getUserState = createFeatureSelector<UserState>('user');
export const selectPortalState = createFeatureSelector<fromPortal.PortalState>('portal');
export const selectIndicatorState = createFeatureSelector<fromIndicator.State>('indicators');
export const selectIndicatorGroupState = createFeatureSelector<fromIndicatorGroup.State>('indicatorGroups');
export const selectMenuState = createFeatureSelector<fromMenu.State>('menus');
export const selectVisualizationState = createFeatureSelector<fromVisualization.State>('visualizations');

