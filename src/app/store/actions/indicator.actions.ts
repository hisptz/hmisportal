import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Indicator} from '../../shared/models/indicator';

export enum IndicatorActionTypes {
  LOAD_INDICATORS = '[Indicator] Load Indicators',
  ADD_INDICATOR = '[Indicator] Add Indicator',
  UPSERT_INDICATOR = '[Indicator] Upsert Indicator',
  ADD_INDICATORS = '[Indicator] Add Indicators',
  UPSERT_INDICATORS = '[Indicator] Upsert Indicators',
  UPDATE_INDICATOR = '[Indicator] Update Indicator',
  UPDATE_INDICATORS = '[Indicator] Update Indicators',
  DELETE_INDICATOR = '[Indicator] Delete Indicator',
  DELETE_INDICATORS = '[Indicator] Delete Indicators',
  CLEAR_INDICATORS = '[Indicator] Clear Indicators',
  SET_SELECTED_INDICATOR = '[Indicator] Set Selected Indicator'
}

export class LoadIndicators implements Action {
  readonly type = IndicatorActionTypes.LOAD_INDICATORS;

  constructor(public payload: { indicators: Indicator[] }) {}
}

export class AddIndicator implements Action {
  readonly type = IndicatorActionTypes.ADD_INDICATOR;

  constructor(public payload: { indicator: Indicator }) {}
}

export class UpsertIndicator implements Action {
  readonly type = IndicatorActionTypes.UPSERT_INDICATOR;

  constructor(public payload: { indicator: Update<Indicator> }) {}
}

export class AddIndicators implements Action {
  readonly type = IndicatorActionTypes.ADD_INDICATORS;

  constructor(public payload: { indicators: Indicator[] }) {}
}

export class UpsertIndicators implements Action {
  readonly type = IndicatorActionTypes.UPSERT_INDICATORS;

  constructor(public payload: { indicators: Update<Indicator>[] }) {}
}

export class UpdateIndicator implements Action {
  readonly type = IndicatorActionTypes.UPDATE_INDICATOR;

  constructor(public payload: { indicator: Update<Indicator> }) {}
}

export class UpdateIndicators implements Action {
  readonly type = IndicatorActionTypes.UPDATE_INDICATORS;

  constructor(public payload: { indicators: Update<Indicator>[] }) {}
}

export class DeleteIndicator implements Action {
  readonly type = IndicatorActionTypes.DELETE_INDICATOR;

  constructor(public payload: { id: string }) {}
}

export class SetSelectedIndicator implements Action {
  readonly type = IndicatorActionTypes.SET_SELECTED_INDICATOR;
  constructor(public payload: string) {}
}

export class DeleteIndicators implements Action {
  readonly type = IndicatorActionTypes.DELETE_INDICATORS;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearIndicators implements Action {
  readonly type = IndicatorActionTypes.CLEAR_INDICATORS;
}

export type IndicatorActions =
  LoadIndicators
  | AddIndicator
  | UpsertIndicator
  | AddIndicators
  | UpsertIndicators
  | UpdateIndicator
  | UpdateIndicators
  | DeleteIndicator
  | DeleteIndicators
  | ClearIndicators
  | SetSelectedIndicator;
