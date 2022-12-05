import { Component, OnInit, Input } from '@angular/core';
import { Questions } from 'src/app/interfaces/questions';

import * as am5 from '@amcharts/amcharts5';

@Component({
  selector: 'app-poll-item',
  templateUrl: './poll-item.component.html',
  styleUrls: ['./poll-item.component.scss'],
})
export class PollItemComponent implements OnInit {
  @Input() questions!: Questions;
  // @Input() id: any;
  root!: am5.Root;

  constructor() {}

  ngOnInit() {}
}
