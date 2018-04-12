import { Visualization } from '../visualization.state';
import * as _ from 'lodash';
import { CurrentUserState } from '../current-user.state';
import { getVisualizationWidthFromShape } from './get-visualization-width-from-shape.helper';
import {Indicator} from '../../../shared/models/indicator';
import {settings} from 'cluster';

export function mapDashboardItemToVisualization(
  indicator: Indicator,
  dashboardId: string = null,
  currentUser: CurrentUserState = null
): Visualization {
  return {
    id: indicator.id,
    name: indicator.title,
    type: indicator.visualization_type ? indicator.visualization_type.toUpperCase() : 'CHART',
    created: null,
    lastUpdated: null,
    shape: indicator.cardClass || 'NORMAL',
    dashboardId: indicator.id,
    subtitle: null,
    description: indicator.description,
    details: {
      shape: indicator.cardClass || 'NORMAL',
      loaded: false,
      hasError: false,
      errorMessage: '',
      appKey: null,
      hideCardBorders: false,
      showCardHeader: true,
      showCardFooter: true,
      showChartOptions: true,
      showFilter: true,
      cardHeight: '450px',
      itemHeight: '430px',
      width: getVisualizationWidthFromShape(indicator.cardClass),
      fullScreen: false,
      type: getSanitizedCurrentVisualizationType(indicator.visualization_type ? indicator.visualization_type.toUpperCase() : 'CHART'),
      currentVisualization: getSanitizedCurrentVisualizationType(
        indicator.visualization_type ? indicator.visualization_type.toUpperCase() : 'CHART'
      ),
      favorite: null,
      externalDimensions: {},
      filters: [],
      layouts: [],
      analyticsStrategy: 'normal',
      rowMergingStrategy: 'normal',
      userOrganisationUnit: null,
      nonVisualizable: false
    },
    layers: [{settings: {}, analytics: null}],
    operatingLayers: []
  };
}

function getVisualizationObjectName(dashboardItem: any) {
  return dashboardItem.type !== null &&
    dashboardItem.hasOwnProperty(_.camelCase(dashboardItem.type))
    ? _.isPlainObject(dashboardItem[_.camelCase(dashboardItem.type)])
      ? dashboardItem[_.camelCase(dashboardItem.type)].displayName
      : null
    : null;
}

function getLoadedStatus(dashboardItem: any) {
  return (
    dashboardItem.type === 'USERS' ||
    dashboardItem.type === 'REPORTS' ||
    dashboardItem.type === 'RESOURCES' ||
    dashboardItem.type === 'APP' ||
    dashboardItem.type === 'MESSAGES'
  );
}

function getSanitizedCurrentVisualizationType(
  visualizationType: string
): string {
  let sanitizedVisualization: string = null;

  if (visualizationType === 'CHART' || visualizationType === 'EVENT_CHART') {
    sanitizedVisualization = 'CHART';
  } else if (
    visualizationType === 'TABLE' ||
    visualizationType === 'EVENT_REPORT' ||
    visualizationType === 'REPORT_TABLE'
  ) {
    sanitizedVisualization = 'TABLE';
  } else if (visualizationType === 'MAP') {
    sanitizedVisualization = 'MAP';
  } else {
    sanitizedVisualization = visualizationType;
  }
  return sanitizedVisualization;
}

function getFavoriteDetails(dashboardItem: any) {
  const favoriteId = _.isPlainObject(
    dashboardItem[_.camelCase(dashboardItem.type)]
  )
    ? dashboardItem[_.camelCase(dashboardItem.type)].id
    : undefined;

  return dashboardItem.type &&
    dashboardItem.hasOwnProperty(_.camelCase(dashboardItem.type))
    ? {
        id: favoriteId,
        type: _.camelCase(dashboardItem.type)
      }
    : {};
}

// function getUserOrganisationUnit(currentUser: CurrentUserState): any[] {
//   if (!currentUser.dataViewOrganisationUnits) {
//     return [];
//   }
//   return currentUser.dataViewOrganisationUnits;
// }

function getLayerDetailsForNonVisualizableObject(dashboardItem) {
  return dashboardItem.type === 'USERS' ||
    dashboardItem.type === 'REPORTS' ||
    dashboardItem.type === 'RESOURCES' ||
    dashboardItem.type === 'APP'
    ? [{ settings: dashboardItem, analytics: {} }]
    : [];
}

function checkIfIsNonVisualizable(dashboardItem: any) {
  return dashboardItem.type === 'USERS' ||
    dashboardItem.type === 'REPORTS' ||
    dashboardItem.type === 'RESOURCES' ||
    dashboardItem.type === 'APP' ||
    dashboardItem.type === 'MESSAGES'
    ? true
    : false;
}
