import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.scss'],
})
export class PollsListComponent implements OnInit {
  @Input() selectedPollById$?: Observable<any>;

  constructor() {}

  ngOnInit() {}
}
