import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from 'src/app/interfaces/poll';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedPollById?: Observable<Poll>;
  constructor(private loader: LoadingService) {}

  loading$ = this.loader.loading$;

  ngOnInit() {}

  getPollById(poll: Observable<Poll>) {
    this.selectedPollById = poll;
  }
}
