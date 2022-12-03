import { Component, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Polls } from 'src/app/interfaces/polls';
import { PollsService } from 'src/app/services/polls.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-poll-filter',
  templateUrl: './poll-filter.component.html',
  styleUrls: ['./poll-filter.component.scss'],
})
export class PollFilterComponent implements OnInit {
  constructor(private pollsService: PollsService) {}

  polls$: Observable<Polls[]> = this.pollsService.getAllPolls();

  pollForm = new FormGroup({
    selectedPoll: new FormControl(''),
  });

  ngOnInit() {
    this.polls$.pipe(first()).subscribe((polls) => {
      this.pollForm.patchValue({
        selectedPoll: polls[0].groupId,
      });
    });
  }
  changePoll() {
    console.log(this.pollForm.value);
  }
}
