import {Action} from '@ngrx/store';

export const SET_TITLE = '[Portal] Set Portal Title';
export const SET_QUARTER = '[Portal] Set Portal Quarter';
export const SET_YEAR = '[Portal] Set Portal Year';
export const SET_MENU = '[Portal] Set Portal Menu';
export const LOAD_PORTAL = '[Portal] Load Portal';
export const LOAD_PORTAL_SUCCESS = '[Portal] Load Portal Success';
export const LOAD_PORTAL_FAIL = '[Portal] Load Portal Fail';

export class SetTitle implements Action {
  readonly type = SET_TITLE;
  constructor(public payload: string) {}
}

export class SetQuarter implements Action {
  readonly type = SET_QUARTER;
  constructor(public payload: string) {}
}

export class SetYear implements Action {
  readonly type = SET_YEAR;
  constructor(public payload: number) {}
}

export class SetMenu implements Action {
  readonly type = SET_MENU;
  constructor(public payload: string[]) {}
}

export class LoadPortal implements Action {
  readonly type = LOAD_PORTAL;
}

export class LoadPortalSuccess implements Action {
  readonly type = LOAD_PORTAL_SUCCESS;
}

export class LoadPortalFail implements Action {
  readonly type = LOAD_PORTAL_FAIL;
  constructor(public payload: string) {}
}

export type PortalActions =
  SetTitle
  | SetQuarter
  | SetYear
  | SetMenu
  | LoadPortal
  | LoadPortalSuccess
  | LoadPortalFail;
