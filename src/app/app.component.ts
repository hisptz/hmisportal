import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from './store/reducers/index';
import {Observable} from 'rxjs/Observable';
import { LoadPortal } from './store/actions/portal.actions';
import { PortalMenu } from './shared/models/menu';
import * as menuSelector from './store/selectors/menu.selectors';
import * as portalSelector from './store/selectors/portal.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title$: Observable<string>;
  last_quarter$: Observable<string>;
  last_year$: Observable<string>;
  mainmenus$: Observable<PortalMenu[]>;
  menus$: Observable<{[id: string]: PortalMenu}>;

  constructor(private store: Store<ApplicationState>) {
    this.store.dispatch(new LoadPortal());
    this.menus$ = this.store.select(menuSelector.selectMenuEntities);
    this.mainmenus$ = this.store.select(portalSelector.getMainMenu);
    this.title$ = this.store.select(portalSelector.getTitle);
  }
}
