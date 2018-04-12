import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { VisualizationActions, VisualizationActionTypes } from '../actions/visualization.actions';
import {Visualization} from '../visualization/visualization.state';

export interface State extends EntityState<Visualization> {
  // additional entities state properties
  selectedVisualizationId: string | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Visualization> = createEntityAdapter<Visualization>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedVisualizationId: null,
  loading: false,
  loaded: false
});

export function reducer(
  state = initialState,
  action: VisualizationActions
): State {
  switch (action.type) {
    case VisualizationActionTypes.ADD_VISUALIZATION: {
      return adapter.addOne(action.payload.visualization, state);
    }

    case VisualizationActionTypes.UPSERT_VISUALIZATION: {
      return adapter.upsertOne(action.payload.visualization, state);
    }

    case VisualizationActionTypes.ADD_VISUALIZATIONS: {
      return adapter.addMany(action.payload.visualizations, state);
    }

    case VisualizationActionTypes.UPSERT_VISUALIZATIONS: {
      return adapter.upsertMany(action.payload.visualizations, state);
    }

    case VisualizationActionTypes.UPDATE_VISUALIZATION: {
      return adapter.updateOne(action.payload.visualization, state);
    }

    case VisualizationActionTypes.UPDATE_VISUALIZATIONS: {
      return adapter.updateMany(action.payload.visualizations, state);
    }

    case VisualizationActionTypes.DELETE_VISUALIZATION: {
      return adapter.removeOne(action.payload.id, state);
    }

    case VisualizationActionTypes.DELETE_VISUALIZATIONS: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case VisualizationActionTypes.LOAD_VISUALIZATIONS: {
      return adapter.addAll(action.payload.visualizations, state);
    }

    case VisualizationActionTypes.CLEAR_VISUALIZATIONS: {
      return adapter.removeAll({ ...state, selectedVisualizationId: null });
    }

    case VisualizationActionTypes.SET_SELECTED_VISUALIZATION: {
      return { ...state, selectedVisualizationId: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedVisualizationId = (state: State) => state.selectedVisualizationId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  // select the array of visualization ids
  selectIds: selectVisualizationIds,

  // select the dictionary of visualization entities
  selectEntities: selectVisualizationEntities,

  // select the array of visualizations
  selectAll: selectAllVisualizations,

  // select the total visualization count
  selectTotal: selectVisualizationTotal
} = adapter.getSelectors();
