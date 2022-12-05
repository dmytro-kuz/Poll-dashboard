import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { PollFilterComponent } from './poll-filter/poll-filter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PollsListComponent } from './polls-list/polls-list.component';
import { PollItemComponent } from './poll-item/poll-item.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoaderInterceptorProvider } from '../interceptors/loader.interceptor';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    HeaderComponent,
    PollFilterComponent,
    DashboardComponent,
    PollsListComponent,
    PollItemComponent,
    PieChartComponent,
    BarChartComponent,
  ],
  providers: [LoaderInterceptorProvider],
  exports: [HeaderComponent, DashboardComponent, PollsListComponent],
})
export class ComponentsModule {}
