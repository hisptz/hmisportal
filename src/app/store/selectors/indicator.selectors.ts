import {createSelector} from '@ngrx/store';
import * as fromIndicator from '../reducers/indicator.reducer';
import {selectIndicatorState} from '../reducers/index';
import {selectCurrentIndicatorGroup} from './indicatorGroup.selectors';

export const selectIndicatorIds = createSelector(selectIndicatorState, fromIndicator.selectIndicatorIds);
export const selectIndicatorEntities = createSelector(selectIndicatorState, fromIndicator.selectIndicatorEntities);
export const selectAllIndicators = createSelector(selectIndicatorState, fromIndicator.selectAllIndicators);
export const selectIndicatorTotal = createSelector(selectIndicatorState, fromIndicator.selectIndicatorTotal);
export const selectCurrentIndicatorId = createSelector(selectIndicatorState, fromIndicator.getSelectedIndicatorId);
export const selectIndicatorLoading = createSelector(selectIndicatorState, fromIndicator.getLoading);
export const selectIndicatorLoaded = createSelector(selectIndicatorState, fromIndicator.getLoading);

export const selectCurrentIndicator = createSelector(
  selectIndicatorEntities,
  selectCurrentIndicatorId,
  (indicatorEntities, indicatorId) => indicatorEntities[indicatorId]
);

export const selectedIndicators = createSelector(
  selectIndicatorEntities,
  selectCurrentIndicatorGroup,
  (indicators, group) => {
    return group.indicators.map(indicator => indicators[indicator]);
  }
);
