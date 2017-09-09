import { StoreData } from '../store-data';
import { SET_CURRENT_PAGE } from '../actions/store.data.action';

import * as _ from 'lodash';


export function storeData(state: StoreData, action: any): StoreData {
    switch (action.type)  {

      case SET_CURRENT_PAGE:
        const currentState = _.cloneDeep(state);
        currentState.currentpage = action.payload;
        return currentState;

      default:
        return state;
    }
}















