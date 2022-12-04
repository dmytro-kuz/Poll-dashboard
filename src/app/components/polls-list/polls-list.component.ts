import { Component, OnInit } from '@angular/core';
import { PollsService } from 'src/app/services/polls.service';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.scss'],
})
export class PollsListComponent implements OnInit {
  constructor(private pollsService: PollsService) {}

  ngOnInit() {}
}
