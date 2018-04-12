import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Visualization} from '../visualization/visualization.state';

export enum VisualizationActionTypes {
  LOAD_VISUALIZATIONS = '[Visualization] Load Visualizations',
  ADD_VISUALIZATION = '[Visualization] Add Visualization',
  UPSERT_VISUALIZATION = '[Visualization] Upsert Visualization',
  ADD_VISUALIZATIONS = '[Visualization] Add Visualizations',
  UPSERT_VISUALIZATIONS = '[Visualization] Upsert Visualizations',
  UPDATE_VISUALIZATION = '[Visualization] Update Visualization',
  UPDATE_VISUALIZATIONS = '[Visualization] Update Visualizations',
  DELETE_VISUALIZATION = '[Visualization] Delete Visualization',
  DELETE_VISUALIZATIONS = '[Visualization] Delete Visualizations',
  CLEAR_VISUALIZATIONS = '[Visualization] Clear Visualizations',
  SET_SELECTED_VISUALIZATION = '[Visualization] Set Selected Visualization'
}

export class LoadVisualizations implements Action {
  readonly type = VisualizationActionTypes.LOAD_VISUALIZATIONS;

  constructor(public payload: { visualizations: Visualization[] }) {}
}

export class AddVisualization implements Action {
  readonly type = VisualizationActionTypes.ADD_VISUALIZATION;

  constructor(public payload: { visualization: Visualization }) {}
}

export class UpsertVisualization implements Action {
  readonly type = VisualizationActionTypes.UPSERT_VISUALIZATION;

  constructor(public payload: { visualization: Update<Visualization> }) {}
}

export class AddVisualizations implements Action {
  readonly type = VisualizationActionTypes.ADD_VISUALIZATIONS;

  constructor(public payload: { visualizations: Visualization[] }) {}
}

export class UpsertVisualizations implements Action {
  readonly type = VisualizationActionTypes.UPSERT_VISUALIZATIONS;

  constructor(public payload: { visualizations: Update<Visualization>[] }) {}
}

export class UpdateVisualization implements Action {
  readonly type = VisualizationActionTypes.UPDATE_VISUALIZATION;

  constructor(public payload: { visualization: Update<Visualization> }) {}
}

export class UpdateVisualizations implements Action {
  readonly type = VisualizationActionTypes.UPDATE_VISUALIZATIONS;

  constructor(public payload: { visualizations: Update<Visualization>[] }) {}
}

export class DeleteVisualization implements Action {
  readonly type = VisualizationActionTypes.DELETE_VISUALIZATION;

  constructor(public payload: { id: string }) {}
}

export class SetSelectedVisualization implements Action {
  readonly type = VisualizationActionTypes.SET_SELECTED_VISUALIZATION;
  constructor(public payload: string) {}
}

export class DeleteVisualizations implements Action {
  readonly type = VisualizationActionTypes.DELETE_VISUALIZATIONS;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearVisualizations implements Action {
  readonly type = VisualizationActionTypes.CLEAR_VISUALIZATIONS;
}

export type VisualizationActions =
  LoadVisualizations
  | AddVisualization
  | UpsertVisualization
  | AddVisualizations
  | UpsertVisualizations
  | UpdateVisualization
  | UpdateVisualizations
  | DeleteVisualization
  | DeleteVisualizations
  | ClearVisualizations
  | SetSelectedVisualization;
