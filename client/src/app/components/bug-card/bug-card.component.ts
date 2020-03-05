import { Component, OnInit, Input } from '@angular/core';

import { Bug } from 'src/app/models/bug';

@Component({
  selector: 'app-bug-card',
  templateUrl: './bug-card.component.html',
  styleUrls: ['./bug-card.component.scss']
})
export class BugCardComponent implements OnInit {
  @Input() bug: Bug[]

  constructor() {}

  ngOnInit() {}

}
