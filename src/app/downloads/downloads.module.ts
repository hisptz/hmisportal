import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DownloadsComponent} from './downloads.component';
import {downloads_routing} from './downloads.routing';

@NgModule({
  imports: [
    CommonModule,
    downloads_routing
  ],
  declarations: [
    DownloadsComponent
  ]
})
export class DownloadsModule { }
