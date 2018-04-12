import {createSelector} from '@ngrx/store';
import * as fromVisualization from '../reducers/visualization.reducer';
import {selectVisualizationState} from '../reducers/index';
import {selectCurrentIndicatorGroup} from './indicatorGroup.selectors';

export const selectVisualizationIds = createSelector(selectVisualizationState, fromVisualization.selectVisualizationIds);
export const selectVisualizationEntities = createSelector(selectVisualizationState, fromVisualization.selectVisualizationEntities);
export const selectAllVisualizations = createSelector(selectVisualizationState, fromVisualization.selectAllVisualizations);
export const selectVisualizationTotal = createSelector(selectVisualizationState, fromVisualization.selectVisualizationTotal);
export const selectCurrentVisualizationId = createSelector(selectVisualizationState, fromVisualization.getSelectedVisualizationId);
export const selectVisualizationLoading = createSelector(selectVisualizationState, fromVisualization.getLoading);
export const selectVisualizationLoaded = createSelector(selectVisualizationState, fromVisualization.getLoading);

export const selectCurrentVisualization = createSelector(
  selectVisualizationEntities,
  selectCurrentVisualizationId,
  (visualizationEntities, visualizationId) => visualizationEntities[visualizationId]
);

export const selectedVisualizations = createSelector(
  selectVisualizationEntities,
  selectCurrentIndicatorGroup,
  (visualizations, group) => {
    return group.indicators.map(indicator => visualizations[indicator]);
  }
);
