import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll-filter',
  templateUrl: './poll-filter.component.html',
  styleUrls: ['./poll-filter.component.scss'],
})
export class PollFilterComponent implements OnInit {
  constructor() {}

  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  ngOnInit() {}
}
