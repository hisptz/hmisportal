import {ApplicationState} from './application.state';
import {createSelector} from '@ngrx/store';

import * as _ from 'lodash';

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

export const getDashboardPeriod = createSelector(getStoreData, (datastate) => {
  return datastate.dashboardPeriod;
});

export const getNormalPeriod = createSelector(getStoreData, (datastate) => {
  return datastate.currentperiod;
});

export const getSelectedOrgunit = createSelector(getStoreData, (datastate) => {
  return datastate.currentorgunit;
});

export const getOrganisationUnits = createSelector(getStoreData, (datastate) => {
  return datastate.orgUnits;
});

export const getSelectedOrganisationUnit = createSelector(getStoreData, getSelectedOrgunit, (datastate, orgunit ) => {
  return _.find(datastate.orgUnits, function (ou) {
    return ou.id === orgunit;
  });
});

export const getPortalItems = createSelector(getStoreData, getCurrentPage, (datastate, currentpage) => {
  return datastate.data[currentpage];
});
