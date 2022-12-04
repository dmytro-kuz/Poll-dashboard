import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from 'src/app/interfaces/poll';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedPollById?: Observable<Poll>;
  constructor() {}

  ngOnInit() {}

  getPollById(poll: Observable<Poll>) {
    this.selectedPollById = poll;
  }
}
