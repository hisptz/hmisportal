import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatesComponent } from './updates.component';
import {updates_routing} from './updates.routing';

@NgModule({
  imports: [
    CommonModule,
    updates_routing
  ],
  declarations: [
    UpdatesComponent
  ]
})
export class UpdatesModule { }
