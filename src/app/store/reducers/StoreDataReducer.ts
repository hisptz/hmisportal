import { StoreData } from '../store-data';
import * as store_actions from '../actions/store.data.action';

import * as _ from 'lodash';


export function storeData(state: StoreData, action: any): StoreData {
    switch (action.type)  {

      case store_actions.SET_CURRENT_PAGE:
        const currentState = _.cloneDeep(state);
        currentState.currentpage = action.payload;
        return currentState;

      case store_actions.SET_DASHBOARD_PERIOD:
        const current = _.cloneDeep(state);
        current.dashboardPeriod = action.payload;
        return current;

      case store_actions.SET_SELECTED_PERIOD:
        const currentpe = _.cloneDeep(state);
        currentpe.currentperiod = action.payload;
        return currentpe;

      case store_actions.SET_SELECTED_OU:
        const currentStore = _.cloneDeep(state);
        currentStore.currentorgunit = action.payload;
        return currentStore;

      default:
        return state;
    }
}















