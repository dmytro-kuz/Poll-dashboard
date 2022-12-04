import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Polls } from 'src/app/interfaces/polls';
import { PollsService } from 'src/app/services/polls.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Poll } from 'src/app/interfaces/poll';

@Component({
  selector: 'app-poll-filter',
  templateUrl: './poll-filter.component.html',
  styleUrls: ['./poll-filter.component.scss'],
})
export class PollFilterComponent implements OnInit {
  constructor(
    private pollsService: PollsService,
    private formBuilder: FormBuilder
  ) {}

  @Output() selectedPollById = new EventEmitter<Observable<Poll>>();

  polls$: Observable<Polls[]> = this.pollsService.getAllPolls();
  polls?: Polls[];
  pollForm: FormGroup = this.formBuilder.group({
    selectedPoll: [''],
    selectedId: [''],
  });

  ngOnInit() {
    this.polls$.pipe(first()).subscribe((polls) => {
      this.applyFilters(polls[0].formId);
      this.polls = polls;
      this.pollForm.patchValue({
        selectedPoll: polls[0].groupId,
        selectedId: polls[0].formId,
      });
    });
  }

  applyFilters(pollId?: string) {
    this.selectedPollById.emit(
      this.pollsService.getPoll({
        id: pollId || this.pollForm.value.selectedPoll,
      })
    );
  }
}
