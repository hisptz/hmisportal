import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {PortalMenu} from '../../shared/models/menu';

export enum MenuActionTypes {
  LOAD_MENUS = '[Menu] Load Menus',
  ADD_MENU = '[Menu] Add Menu',
  UPSERT_MENU = '[Menu] Upsert Menu',
  ADD_MENUS = '[Menu] Add Menus',
  UPSERT_MENUS = '[Menu] Upsert Menus',
  UPDATE_MENU = '[Menu] Update Menu',
  UPDATE_MENUS = '[Menu] Update Menus',
  DELETE_MENU = '[Menu] Delete Menu',
  DELETE_MENUS = '[Menu] Delete Menus',
  CLEAR_MENUS = '[Menu] Clear Menus',
  SET_SELECTED_MENU = '[Menu] Set Selected Menu',
  SET_SELECTED_SUBMENU = '[Menu] Set Selected Sub Menu'
}

export class LoadMenus implements Action {
  readonly type = MenuActionTypes.LOAD_MENUS;

  constructor(public payload: { menus: PortalMenu[] }) {}
}

export class AddMenu implements Action {
  readonly type = MenuActionTypes.ADD_MENU;

  constructor(public payload: { menu: PortalMenu }) {}
}

export class UpsertMenu implements Action {
  readonly type = MenuActionTypes.UPSERT_MENU;

  constructor(public payload: { menu: Update<PortalMenu> }) {}
}

export class AddMenus implements Action {
  readonly type = MenuActionTypes.ADD_MENUS;

  constructor(public payload: { menus: PortalMenu[] }) {}
}

export class UpsertMenus implements Action {
  readonly type = MenuActionTypes.UPSERT_MENUS;

  constructor(public payload: { menus: Update<PortalMenu>[] }) {}
}

export class UpdateMenu implements Action {
  readonly type = MenuActionTypes.UPDATE_MENU;

  constructor(public payload: { menu: Update<PortalMenu> }) {}
}

export class UpdateMenus implements Action {
  readonly type = MenuActionTypes.UPDATE_MENUS;

  constructor(public payload: { menus: Update<PortalMenu>[] }) {}
}

export class DeleteMenu implements Action {
  readonly type = MenuActionTypes.DELETE_MENU;

  constructor(public payload: { id: string }) {}
}

export class SetSelectedMenu implements Action {
  readonly type = MenuActionTypes.SET_SELECTED_MENU;
  constructor(public payload:  string ) {}
}

export class SetSelectedSubMenu implements Action {
  readonly type = MenuActionTypes.SET_SELECTED_SUBMENU;
  constructor(public payload:  string ) {}
}

export class DeleteMenus implements Action {
  readonly type = MenuActionTypes.DELETE_MENUS;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearMenus implements Action {
  readonly type = MenuActionTypes.CLEAR_MENUS;
}

export type MenuActions =
  LoadMenus
  | AddMenu
  | UpsertMenu
  | AddMenus
  | UpsertMenus
  | UpdateMenu
  | UpdateMenus
  | DeleteMenu
  | DeleteMenus
  | ClearMenus
  | SetSelectedMenu
  | SetSelectedSubMenu;
