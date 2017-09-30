import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { TableTemplateComponent } from './table-template/table-template.component';
import { Ng2HighchartsModule } from 'ng2-highcharts';
import {PlaceholderComponent} from './placeholder/placeholder.component';
import {MetadataDictionaryComponent} from "./metadata-dictionary/metadata-dictionary.component";
import { IndicatordisplayComponent } from './indicatordisplay/indicatordisplay.component';
import {MapTemplateComponent} from "./map-template/map-template.component";

@NgModule({
  imports: [
    CommonModule,
    Ng2HighchartsModule,
    FormsModule
  ],
  declarations: [
    TableTemplateComponent,
    MapTemplateComponent,
    PlaceholderComponent,
    MetadataDictionaryComponent,
    IndicatordisplayComponent
  ],
  exports: [
    FormsModule,
    Ng2HighchartsModule,
    TableTemplateComponent,
    PlaceholderComponent,
    MetadataDictionaryComponent,
    IndicatordisplayComponent
  ]
})
export class SharedModule { }
