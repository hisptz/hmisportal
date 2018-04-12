import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MenuActions, MenuActionTypes } from '../actions/menu.actions';
import {PortalMenu} from '../../shared/models/menu';

export interface State extends EntityState<PortalMenu> {
  // additional entities state properties
  selectedMenuId: string;
  selectedSubMenuId: string;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<PortalMenu> = createEntityAdapter<PortalMenu>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedMenuId: null,
  selectedSubMenuId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: MenuActions
): State {
  switch (action.type) {
    case MenuActionTypes.ADD_MENU: {
      return adapter.addOne(action.payload.menu, state);
    }

    case MenuActionTypes.UPSERT_MENU: {
      return adapter.upsertOne(action.payload.menu, state);
    }

    case MenuActionTypes.ADD_MENUS: {
      return adapter.addMany(action.payload.menus, state);
    }

    case MenuActionTypes.UPSERT_MENUS: {
      return adapter.upsertMany(action.payload.menus, state);
    }

    case MenuActionTypes.UPDATE_MENU: {
      return adapter.updateOne(action.payload.menu, state);
    }

    case MenuActionTypes.UPDATE_MENUS: {
      return adapter.updateMany(action.payload.menus, state);
    }

    case MenuActionTypes.DELETE_MENU: {
      return adapter.removeOne(action.payload.id, state);
    }

    case MenuActionTypes.DELETE_MENUS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case MenuActionTypes.LOAD_MENUS: {
      return adapter.addAll(action.payload.menus, state);
    }

    case MenuActionTypes.CLEAR_MENUS: {
      return adapter.removeAll({ ...state, selectedMenuId: null, selectedSubMenuId: null });
    }

    case MenuActionTypes.SET_SELECTED_MENU: {
      return { ...state, selectedMenuId: action.payload };
    }

    case MenuActionTypes.SET_SELECTED_SUBMENU: {
      return { ...state, selectedSubMenuId: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedMenuId = (state: State) => state.selectedMenuId;
export const getSelectedSubMenuId = (state: State) => state.selectedSubMenuId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  // select the array of menu ids
  selectIds: selectMenuIds,

  // select the dictionary of menu entities
  selectEntities: selectMenuEntities,

  // select the array of menus
  selectAll: selectAllMenus,

  // select the total menu count
  selectTotal: selectMenuTotal
} = adapter.getSelectors();
