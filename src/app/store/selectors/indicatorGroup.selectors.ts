import {createSelector} from '@ngrx/store';
import * as fromIndicatorGroup from '../reducers/indicatorGroup.reducer';
import {getRouterState, selectIndicatorGroupState} from '../reducers/index';
import {IndicatorGroup} from '../../shared/models/indicatorGroup';

export const selectIndicatorGroupIds = createSelector(selectIndicatorGroupState, fromIndicatorGroup.selectIndicatorGroupIds);
export const selectIndicatorGroupEntities = createSelector(selectIndicatorGroupState, fromIndicatorGroup.selectIndicatorGroupEntities);
export const selectAllIndicatorGroups = createSelector(selectIndicatorGroupState, fromIndicatorGroup.selectAllIndicatorGroups);
export const selectIndicatorGroupTotal = createSelector(selectIndicatorGroupState, fromIndicatorGroup.selectIndicatorGroupTotal);
export const selectCurrentIndicatorGroupId = createSelector(selectIndicatorGroupState, fromIndicatorGroup.getSelectedIndicatorGroupId);
export const selectIndicatorGroupLoading = createSelector(selectIndicatorGroupState, fromIndicatorGroup.getLoading);
export const selectIndicatorGroupLoaded = createSelector(selectIndicatorGroupState, fromIndicatorGroup.getLoading);

export const selectCurrentIndicatorGroup = createSelector(
  selectIndicatorGroupEntities,
  getRouterState,
  (entities, router): IndicatorGroup => {
    return router.state && entities[router.state.params.indicatorid];
  }
);
