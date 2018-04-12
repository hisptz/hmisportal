import { createSelector } from '@ngrx/store';
import * as fromPortal from '../reducers/portal.reducer';
import { selectPortalState } from '../reducers/index';
import { selectMenuEntities } from './menu.selectors';

export const getTitle = createSelector(selectPortalState, fromPortal.getTitle);
export const getLastQuarter = createSelector(selectPortalState, fromPortal.getLastQuarter);
export const getLastYear = createSelector(selectPortalState, fromPortal.getLastYear);
export const getMainMenusIds = createSelector(selectPortalState, fromPortal.getMainMenusIds);
export const getLoading = createSelector(selectPortalState, fromPortal.getLoading);
export const getLoaded = createSelector(selectPortalState, fromPortal.getLoaded);
export const getError = createSelector(selectPortalState, fromPortal.getError);

export const getMainMenu = createSelector(
  getMainMenusIds,
  selectMenuEntities,
  (mainMenus, menuEntities) => {
    return mainMenus.map(menu => {
      const mainMenu = menuEntities[menu];
      if (mainMenu) {
        const menuItem = {
          ...mainMenu,
          submenus: mainMenu.submenusId.map(submenu => {
            const sub = menuEntities[submenu];
            if (sub) {
              const subMenuItem = {
                ...sub,
                submenus: sub.submenusId.map(subitem => {
                  return menuEntities[subitem];
                })
              };
              return subMenuItem;
            }
          })
        };
        return menuItem;
      }
   });
  }
);
