import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IndicatorActions, IndicatorActionTypes } from '../actions/indicator.actions';
import {Indicator} from '../../shared/models/indicator';

export interface State extends EntityState<Indicator> {
  // additional entities state properties
  selectedIndicatorId: string | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Indicator> = createEntityAdapter<Indicator>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedIndicatorId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: IndicatorActions
): State {
  switch (action.type) {
    case IndicatorActionTypes.ADD_INDICATOR: {
      return adapter.addOne(action.payload.indicator, state);
    }

    case IndicatorActionTypes.UPSERT_INDICATOR: {
      return adapter.upsertOne(action.payload.indicator, state);
    }

    case IndicatorActionTypes.ADD_INDICATORS: {
      return adapter.addMany(action.payload.indicators, state);
    }

    case IndicatorActionTypes.UPSERT_INDICATORS: {
      return adapter.upsertMany(action.payload.indicators, state);
    }

    case IndicatorActionTypes.UPDATE_INDICATOR: {
      return adapter.updateOne(action.payload.indicator, state);
    }

    case IndicatorActionTypes.UPDATE_INDICATORS: {
      return adapter.updateMany(action.payload.indicators, state);
    }

    case IndicatorActionTypes.DELETE_INDICATOR: {
      return adapter.removeOne(action.payload.id, state);
    }

    case IndicatorActionTypes.DELETE_INDICATORS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case IndicatorActionTypes.LOAD_INDICATORS: {
      return adapter.addAll(action.payload.indicators, state);
    }

    case IndicatorActionTypes.CLEAR_INDICATORS: {
      return adapter.removeAll({ ...state, selectedIndicatorId: null });
    }

    case IndicatorActionTypes.SET_SELECTED_INDICATOR: {
      return { ...state, selectedIndicatorId: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedIndicatorId = (state: State) => state.selectedIndicatorId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  // select the array of indicator ids
  selectIds: selectIndicatorIds,

  // select the dictionary of indicator entities
  selectEntities: selectIndicatorEntities,

  // select the array of indicators
  selectAll: selectAllIndicators,

  // select the total indicator count
  selectTotal: selectIndicatorTotal
} = adapter.getSelectors();
