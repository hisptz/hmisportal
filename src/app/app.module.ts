import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PortalRoutingModule } from './app-routing.module';
import { reducers } from './store/reducers/reducers';
import { getInitialState } from './store/application.state';
import { DataStoreEffect } from './store/effects/dataStore.effect';
import { environment } from '../environments/environment';
import { MenuComponent } from './shared/menu/menu.component';
import { PortalService } from './shared/services/portal.service';
import { VisualizerService } from './shared/services/visualizer.service';
import { HttpClientService } from './shared/services/http-client.service';
import { SharedModule } from './shared/shared.module';
import { FamilyPlaningComponent } from './family-planing/family-planing.component';
import {ColorInterpolationService} from './shared/services/map-services/color-interpolation.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FamilyPlaningComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    PortalRoutingModule,
    StoreModule.forRoot(reducers, {
      initialState: getInitialState
    }),
    EffectsModule.forRoot([DataStoreEffect]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    PortalService,
    VisualizerService,
    HttpClientService,
    ColorInterpolationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
