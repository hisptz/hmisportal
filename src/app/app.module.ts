import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { MenuComponent } from './menu/menu.component';
import { SlideshowComponent } from './home/slideshow/slideshow.component';
import { StatisticSummaryComponent } from './home/statistic-summary/statistic-summary.component';
import { DataStatisticsComponent } from './pages/data-statistics/data-statistics.component';
import { DownloadComponent } from './pages/download/download.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HelpComponent } from './pages/help/help.component';
import { RchComponent } from './home/statistic-summary/rch/rch.component';
import { HmisComponent } from './home/statistic-summary/hmis/hmis.component';
import { NacpComponent } from './home/statistic-summary/nacp/nacp.component';
import { PmtctComponent } from './home/statistic-summary/pmtct/pmtct.component';
import { NutritionComponent } from './home/statistic-summary/nutrition/nutrition.component';
import { ThemesComponent } from './home/themes/themes.component';
import { NewsComponent } from './home/news/news.component';
import { FooterComponent } from './footer/footer.component';
import { SurveyReportComponent } from './home/survey-report/survey-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BannerComponent,
    MenuComponent,
    SlideshowComponent,
    StatisticSummaryComponent,
    DataStatisticsComponent,
    DownloadComponent,
    UpdatesComponent,
    FaqComponent,
    HelpComponent,
    RchComponent,
    HmisComponent,
    NacpComponent,
    PmtctComponent,
    NutritionComponent,
    ThemesComponent,
    NewsComponent,
    FooterComponent,
    SurveyReportComponent
  ],
  entryComponents: [HelpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
