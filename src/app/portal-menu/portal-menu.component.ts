import { Component, OnInit, Input } from '@angular/core';
import { PortalMenu } from '../shared/models/menu';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/reducers/index';
import * as portalActions from '../store/actions/portal.actions';
import * as menuActions from '../store/actions/menu.actions';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs/Observable';
import {selectCurrentMenu, selectCurrentSubMenu} from '../store/selectors/menu.selectors';
import * as routeActions from '../store/actions/router.action';
import {Go} from '../store/actions/router.action';
import {SetSelectedIndicatorGroups} from '../store/actions/indicatorGroup.actions';

@Component({
  selector: 'app-portal-menu',
  templateUrl: './portal-menu.component.html',
  styleUrls: ['./portal-menu.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('notHovered' , style({
        'opacity': 0,
        'transform': 'scale(0, 0)',
        'position': 'fixed',
        'top': '-100px',
        'box-shadow': '0 0 0px rgba(0,0,0,0.0)',
        'background-color': 'rgba(0,0,0,0.0)',
        'border': '0px solid #ddd'
      })),
      state('hoovered', style({
        'min-height': '580px',
        'width': '90%',
        'left': '5%',
        'position': 'fixed',
        'opacity': 1,
        'top': '100px',
        'z-index': '100',
        '-webkit-box-shadow': '0 0 10px rgba(0,0,0,0.2)',
        'box-shadow': '0 0 10px rgba(0,0,0,0.2)',
        'background-color': 'rgba(255,255,255,1)',
        'border': '1px solid #ddd'
      })),
      transition('notHovered <=> hoovered', animate('500ms 10ms ease-out'))
    ])
  ]
})
export class PortalMenuComponent implements OnInit {

  @Input() title: string;
  @Input() mainMenus: PortalMenu[];
  @Input() menus: {[id: string]: PortalMenu};
  selectedMenu$: Observable<PortalMenu>;
  selectedSubMenu$: Observable<PortalMenu>;

  showTitleEditor: boolean = false;
  showMenuEditor = {};
  hoverState: string = 'notHovered';
  menuItem: PortalMenu = {
    id: 'newmenu',
    name: 'New Menu',
    has_submenu: false,
    submenus: []
  };

  constructor(private store: Store<ApplicationState>) {
    this.selectedMenu$ = store.select(selectCurrentMenu);
    this.selectedSubMenu$ = store.select(selectCurrentSubMenu);
    this.selectedSubMenu$.subscribe(d => console.log(d));
  }

  ngOnInit() {
  }

  setTitle(event) {
    this.store.dispatch(new portalActions.SetTitle(event.target.value)) ;
  }

  // function that will decide the route to take depending on the type of indicator
  goTo(id, has_submenu, type) {
    if (has_submenu) { } else {
      if (type === 'indicator') {
        this.store.dispatch(new SetSelectedIndicatorGroups(id));
        this.store.dispatch(new Go({path: ['indicators', id]}));
      } else if ( type === 'rawdata') {
        this.store.dispatch(new Go({path: ['dataset', id]}));
      } else if ( type === 'welcome_page') {
        this.store.dispatch(new SetSelectedIndicatorGroups(id));
        this.store.dispatch(new Go({path: ['indicators', id]}));
      } else if ( type === 'downloads') {
        this.store.dispatch(new Go({path: ['resources']}));
      } else if ( type === 'googledrive') {
        this.store.dispatch(new Go({path: ['scorecards']}));
      } else if ( type === 'updates') {
        this.store.dispatch(new Go({path: ['updates']}));
      } else {
        console.log(type);
      }
    }
  }

  updateMainMenu(menu) {
    if (this.hoverState === 'hoovered') {
      this.hoverState = 'notHovered';
      if ( this.menuItem.id !== menu.id) {
        setTimeout(() => this.hoverState = 'hoovered', 500);
      }
    } else {
      this.hoverState = 'hoovered';
    }
    this.store.dispatch(new menuActions.SetSelectedMenu(menu.id));
    this.store.dispatch(new menuActions.SetSelectedSubMenu(''));
    this.menuItem = menu;
  }

  closeModel() {
    this.hoverState = 'notHovered';
  }

}
