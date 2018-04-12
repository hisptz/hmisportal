import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {IndicatorGroup} from '../../shared/models/indicatorGroup';

export enum IndicatorGroupActionTypes {
  LOAD_INDICATORGROUPS = '[IndicatorGroup] Load IndicatorGroups',
  ADD_INDICATORGROUP = '[IndicatorGroup] Add IndicatorGroup',
  UPSERT_INDICATORGROUP = '[IndicatorGroup] Upsert IndicatorGroup',
  ADD_INDICATORGROUPS = '[IndicatorGroup] Add IndicatorGroups',
  UPSERT_INDICATORGROUPS = '[IndicatorGroup] Upsert IndicatorGroups',
  UPDATE_INDICATORGROUP = '[IndicatorGroup] Update IndicatorGroup',
  UPDATE_INDICATORGROUPS = '[IndicatorGroup] Update IndicatorGroups',
  DELETE_INDICATORGROUP = '[IndicatorGroup] Delete IndicatorGroup',
  DELETE_INDICATORGROUPS = '[IndicatorGroup] Delete IndicatorGroups',
  SET_SELECTED_INDICATORGROUP = '[IndicatorGroup] Set Selected Indicator Group',
  CLEAR_INDICATORGROUPS = '[IndicatorGroup] Clear IndicatorGroups'
}

export class LoadIndicatorGroups implements Action {
  readonly type = IndicatorGroupActionTypes.LOAD_INDICATORGROUPS;

  constructor(public payload: { indicatorGroups: IndicatorGroup[] }) {}
}

export class AddIndicatorGroup implements Action {
  readonly type = IndicatorGroupActionTypes.ADD_INDICATORGROUP;

  constructor(public payload: { indicatorGroup: IndicatorGroup }) {}
}

export class UpsertIndicatorGroup implements Action {
  readonly type = IndicatorGroupActionTypes.UPSERT_INDICATORGROUP;

  constructor(public payload: { indicatorGroup: Update<IndicatorGroup> }) {}
}

export class AddIndicatorGroups implements Action {
  readonly type = IndicatorGroupActionTypes.ADD_INDICATORGROUPS;

  constructor(public payload: { indicatorGroups: IndicatorGroup[] }) {}
}

export class UpsertIndicatorGroups implements Action {
  readonly type = IndicatorGroupActionTypes.UPSERT_INDICATORGROUPS;

  constructor(public payload: { indicatorGroups: Update<IndicatorGroup>[] }) {}
}

export class UpdateIndicatorGroup implements Action {
  readonly type = IndicatorGroupActionTypes.UPDATE_INDICATORGROUP;

  constructor(public payload: { indicatorGroup: Update<IndicatorGroup> }) {}
}

export class UpdateIndicatorGroups implements Action {
  readonly type = IndicatorGroupActionTypes.UPDATE_INDICATORGROUPS;

  constructor(public payload: { indicatorGroups: Update<IndicatorGroup>[] }) {}
}

export class DeleteIndicatorGroup implements Action {
  readonly type = IndicatorGroupActionTypes.DELETE_INDICATORGROUP;

  constructor(public payload: { id: string }) {}
}

export class DeleteIndicatorGroups implements Action {
  readonly type = IndicatorGroupActionTypes.DELETE_INDICATORGROUPS;

  constructor(public payload: { ids: string[] }) {}
}

export class SetSelectedIndicatorGroups implements Action {
  readonly type = IndicatorGroupActionTypes.SET_SELECTED_INDICATORGROUP;
  constructor(public payload: string) {}
}

export class ClearIndicatorGroups implements Action {
  readonly type = IndicatorGroupActionTypes.CLEAR_INDICATORGROUPS;
}

export type IndicatorGroupActions =
  LoadIndicatorGroups
  | AddIndicatorGroup
  | UpsertIndicatorGroup
  | AddIndicatorGroups
  | UpsertIndicatorGroups
  | UpdateIndicatorGroup
  | UpdateIndicatorGroups
  | DeleteIndicatorGroup
  | DeleteIndicatorGroups
  | ClearIndicatorGroups
  | SetSelectedIndicatorGroups;
