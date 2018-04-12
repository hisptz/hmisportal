import {Component, Input, OnInit} from '@angular/core';
import {PortalMenu} from '../../shared/models/menu';
import * as menuActions from '../../store/actions/menu.actions';
import {ApplicationState} from '../../store/reducers/index';
import {Store} from '@ngrx/store';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as _ from 'lodash';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(200, style({opacity: 1}))
      ])
    ])
  ]
})
export class MenuLinkComponent implements OnInit {

  @Input() menus: {[id: string]: PortalMenu};
  @Input() menu: PortalMenu;
  editing: any = {};
  deleting: any = {};
  @Input() show_submenu: boolean = false;
  @Input() submenu: PortalMenu = null;
  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() { }

  updateName(value, menu) {
    this.store.dispatch(new menuActions.UpdateMenu(
      {menu: {
        id: menu.id,
        changes: { name: value }
      }}
    ));
  }

  enableEdit(menu, is_first_menu = true) {
    this.editing = {};
    this.editing[menu.id] = true;
    if (is_first_menu) {
      this.store.dispatch(new menuActions.SetSelectedSubMenu(menu.id));
    }
  }

  enableDeleteMenu(menu) {
    this.deleting = {};
    this.deleting[menu.id] = true;
  }

  deleteMenu(menu: PortalMenu, parentMenu) {
    this.store.dispatch(new menuActions.UpdateMenu({
      menu: {
        id: parentMenu.id,
        changes: {
          submenusId: _.without(parentMenu.submenusId, menu.id)
        }
      }
    }));
    this.store.dispatch(new menuActions.DeleteMenu({id: menu.id}));
    if (menu.has_submenu) {
      menu.submenus.forEach((menuItem) => {
        this.deleteMenu(menuItem, menu);
      });
    }
  }

  onDropSuccess(menu) {
    this.store.dispatch(new menuActions.UpdateMenu({
      menu: {
        id: menu.id,
        changes: {
          submenusId: menu.submenus.map(m => m.id)
        }
      }
    }));
  }

  addIndicator(menu: PortalMenu, add_submenu = false) {
      const newMenu: PortalMenu = {
        id: this.makeid(),
        name: 'New Indicator',
        type: menu.type,
        has_submenu: false,
        submenus: [],
        submenu: [],
        submenusId: []
      };
      this.store.dispatch(new menuActions.AddMenu({
        menu: newMenu
      }));
      this.store.dispatch(new menuActions.UpdateMenu({
        menu: {
          id: menu.id,
          changes: {
            submenusId: [newMenu.id, ...menu.submenusId],
            has_submenu: true
          }
        }
      }));
      if (add_submenu) {
        this.enableEdit(menu);
      }
  }


  makeid(): string {
    let text = '';
    const possible_combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 36; i++ ) {
      text += possible_combinations.charAt(Math.floor(Math.random() * possible_combinations.length));
    }
    return text;
  }

  trackItem(index, item) {
    return item ? item.id : undefined;
  }

}
