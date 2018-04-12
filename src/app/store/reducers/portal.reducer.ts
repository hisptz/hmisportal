import * as fromPortalaction from '../actions/portal.actions';
import {PortalMenu} from '../../shared/models/menu';

export interface PortalState {
  title: string;
  last_quarter?: string;
  last_year?: number;
  mainmenus?: PortalMenu[];
  mainmenusId?: string[];
  loading?: boolean;
  loaded?: boolean;
  error?: boolean;
}

export const initialPortalState: PortalState = {
  title: '',
  last_quarter: '',
  last_year: 0,
  mainmenus: [],
  mainmenusId: [],
  error: false,
  loading: false,
  loaded: false
};

export function portalReducer(
  state = initialPortalState,
  action: fromPortalaction.PortalActions
): PortalState {

  switch (action.type) {
    case (fromPortalaction.SET_TITLE): {
      return { ...state, title: action.payload };
    }

    case (fromPortalaction.SET_YEAR): {
      return { ...state, last_year: action.payload };
    }

    case (fromPortalaction.SET_QUARTER): {
      return { ...state, last_quarter: action.payload };
    }

    case (fromPortalaction.SET_MENU): {
      return { ...state, mainmenusId: action.payload };
    }

    case (fromPortalaction.LOAD_PORTAL): {
      return { ...state, loading: true, error: false, loaded: false };
    }

    case (fromPortalaction.LOAD_PORTAL_SUCCESS): {
      return { ...state, loading: false, error: false, loaded: true };
    }

    case (fromPortalaction.LOAD_PORTAL_FAIL): {
      return { ...state, loading: false, error: true, loaded: false };
    }
  }

  return state;
}

export const getTitle = (state: PortalState) => state.title;
export const getLastQuarter = (state: PortalState) => state.last_quarter;
export const getLastYear = (state: PortalState) => state.last_year;
export const getMainMenusIds = (state: PortalState) => state.mainmenusId;
export const getLoading = (state: PortalState) => state.loading;
export const getLoaded = (state: PortalState) => state.loaded;
export const getError = (state: PortalState) => state.error;
