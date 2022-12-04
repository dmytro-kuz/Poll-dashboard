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

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
  ],
  declarations: [
    HeaderComponent,
    PollFilterComponent,
    DashboardComponent,
    PollsListComponent,
    PollItemComponent,
  ],
  exports: [HeaderComponent, DashboardComponent, PollsListComponent],
})
export class ComponentsModule {}
