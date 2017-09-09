import {ApplicationState} from './application.state';
import {createSelector} from '@ngrx/store';
/**
 * Created by kelvin on 9/9/17.
 */
export const getStoreData = (state: ApplicationState) => state.storeData;

export const getQuarters = createSelector(getStoreData, (datastate) => {
  return datastate.quarters;
});

export const getYears = createSelector(getStoreData, (datastate) => {
  return datastate.years;
});

export const getCurrentPage = createSelector(getStoreData, (datastate) => {
  return datastate.currentpage;
});

export const getOrganisationUnits = createSelector(getStoreData, (datastate) => {
  return datastate.orgUnits;
});

export const getPortalItems = createSelector(getStoreData, getCurrentPage, (datastate, currentpage) => {
  return datastate.data[currentpage];
});
