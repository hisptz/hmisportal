import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { StoreModule} from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxPaginationModule} from 'ngx-pagination';
import {DragulaModule} from 'ng2-dragula';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { services} from './shared/services/index';
import { RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import { CustomSerializer} from './store/reducers/router.reducer';
import { AppRoutingModule} from './app-routing.module';
import { environment} from '../environments/environment';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { effects} from './store/effects/index';
import { metaReducers, reducers} from './store/reducers/index';
import { MenuModule} from './shared/components/menu/menu.module';
import { PortalMenuComponent } from './portal-menu/portal-menu.component';
import { MenuLinkComponent } from './portal-menu/menu-link/menu-link.component';
import {DndModule} from 'ng2-dnd';
import { IndicatorsComponent } from './indicators/indicators.component';
import { DatasetComponent } from './dataset/dataset.component';
import { ResourcesComponent } from './resources/resources.component';
import { ScorecardsComponent } from './scorecards/scorecards.component';
import { UpdatesComponent } from './updates/updates.component';
import { SortingComponent } from './indicators/sorting/sorting.component';
import {DataFilterModule} from './shared/components/data-filter/data-filter.module';
import {ProgressLoaderComponent} from './shared/components/progress-loader/progress-loader.component';
import {MapModule} from './shared/components/map/map.module';
import {ChartModule} from './shared/components/chart/chart.module';
import {TableModule} from './shared/components/table/table.module';

// Add a function, that returns a “TranslateHttpLoader” and export it (needed by AoT)
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,
    './assets/i18n/',
    '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PortalMenuComponent,
    MenuLinkComponent,
    IndicatorsComponent,
    DatasetComponent,
    ResourcesComponent,
    ScorecardsComponent,
    UpdatesComponent,
    SortingComponent,
    ProgressLoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MenuModule,
    DataFilterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DragulaModule,
    MapModule,
    ChartModule,
    TableModule,
    DndModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule,
    EffectsModule.forRoot(effects),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 100}) : [],
    AppRoutingModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }, ...services],
  bootstrap: [AppComponent]
})
export class AppModule { }
