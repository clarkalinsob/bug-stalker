import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Bug } from 'src/app/models/bug';

@Component({
  selector: 'app-bug-card',
  templateUrl: './bug-card.component.html',
  styleUrls: ['./bug-card.component.scss']
})
export class BugCardComponent implements OnInit {
  @Input() bug: Bug
  @Input() projectId: string

  constructor() {}

  ngOnInit() {}

}
