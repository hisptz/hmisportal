import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataStatisticsComponent } from './pages/data-statistics/data-statistics.component';
import { DownloadComponent } from './pages/download/download.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'data-statistics',
    component: DataStatisticsComponent
  },
  {
    path: 'download',
    component: DownloadComponent
  },
  {
    path: 'updates',
    component: UpdatesComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
