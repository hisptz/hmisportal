import {createSelector} from '@ngrx/store';
import * as fromMenu from '../reducers/menu.reducer';
import {selectMenuState} from '../reducers/index';

export const selectMenuIds = createSelector(selectMenuState, fromMenu.selectMenuIds);
export const selectMenuEntities = createSelector(selectMenuState, fromMenu.selectMenuEntities);
export const selectAllMenus = createSelector(selectMenuState, fromMenu.selectAllMenus);
export const selectMenuTotal = createSelector(selectMenuState, fromMenu.selectMenuTotal);
export const selectCurrentMenuId = createSelector(selectMenuState, fromMenu.getSelectedMenuId);
export const selectCurrentSubMenuId = createSelector(selectMenuState, fromMenu.getSelectedSubMenuId);
export const selectMenuLoading = createSelector(selectMenuState, fromMenu.getLoading);
export const selectMenuLoaded = createSelector(selectMenuState, fromMenu.getLoading);

export const selectCurrentMenu = createSelector(
  selectMenuEntities,
  selectCurrentMenuId,
  (menuEntities, menuId) => {
    const mainMenu = menuEntities[menuId];
      if (mainMenu) {
        const menuItem = {
          ...mainMenu,
          submenus: mainMenu.submenusId.map(submenu => {
            const sub = menuEntities[submenu];
            const subMenuItem = {
              ...sub,
              submenus: sub.submenusId.map(subitem => {
                return menuEntities[subitem];
              })
            };
            return subMenuItem;
          })
        };
        return menuItem;
      }
  }
);

export const selectCurrentSubMenu = createSelector(
  selectMenuEntities,
  selectCurrentSubMenuId,
  (menuEntities, menuId) => {
    const mainMenu = menuEntities[menuId];
    if (mainMenu) {
      const menuItem = {
        ...mainMenu,
        submenus: mainMenu.submenusId.map(submenu => menuEntities[submenu])
      };
      return menuItem;
    }
  }
);

