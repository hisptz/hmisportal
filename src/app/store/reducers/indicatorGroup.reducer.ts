import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IndicatorGroupActions, IndicatorGroupActionTypes } from '../actions/indicatorGroup.actions';
import {IndicatorGroup} from '../../shared/models/indicatorGroup';

export interface State extends EntityState<IndicatorGroup> {
  // additional entities state properties
  selectedIndicatorGroupId: string | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<IndicatorGroup> = createEntityAdapter<IndicatorGroup>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedIndicatorGroupId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: IndicatorGroupActions
): State {
  switch (action.type) {
    case IndicatorGroupActionTypes.ADD_INDICATORGROUP: {
      return adapter.addOne(action.payload.indicatorGroup, state);
    }

    case IndicatorGroupActionTypes.UPSERT_INDICATORGROUP: {
      return adapter.upsertOne(action.payload.indicatorGroup, state);
    }

    case IndicatorGroupActionTypes.ADD_INDICATORGROUPS: {
      return adapter.addMany(action.payload.indicatorGroups, state);
    }

    case IndicatorGroupActionTypes.UPSERT_INDICATORGROUPS: {
      return adapter.upsertMany(action.payload.indicatorGroups, state);
    }

    case IndicatorGroupActionTypes.UPDATE_INDICATORGROUP: {
      return adapter.updateOne(action.payload.indicatorGroup, state);
    }

    case IndicatorGroupActionTypes.UPDATE_INDICATORGROUPS: {
      return adapter.updateMany(action.payload.indicatorGroups, state);
    }

    case IndicatorGroupActionTypes.DELETE_INDICATORGROUP: {
      return adapter.removeOne(action.payload.id, state);
    }

    case IndicatorGroupActionTypes.DELETE_INDICATORGROUPS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case IndicatorGroupActionTypes.LOAD_INDICATORGROUPS: {
      return adapter.addAll(action.payload.indicatorGroups, state);
    }

    case IndicatorGroupActionTypes.CLEAR_INDICATORGROUPS: {
      return adapter.removeAll({ ...state, selectedIndicatorGroupId: null });
    }

    case IndicatorGroupActionTypes.SET_SELECTED_INDICATORGROUP: {
      return { ...state, selectedIndicatorGroupId: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedIndicatorGroupId = (state: State) => state.selectedIndicatorGroupId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  // select the array of indicatorGroup ids
  selectIds: selectIndicatorGroupIds,

  // select the dictionary of indicatorGroup entities
  selectEntities: selectIndicatorGroupEntities,

  // select the array of indicatorGroups
  selectAll: selectAllIndicatorGroups,

  // select the total indicatorGroup count
  selectTotal: selectIndicatorGroupTotal
} = adapter.getSelectors();
