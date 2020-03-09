import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BugService } from 'src/app/services/bug.service';
import { Bug } from 'src/app/models/bug';

@Component({
  selector: 'app-bug-card',
  templateUrl: './bug-card.component.html',
  styleUrls: ['./bug-card.component.scss']
})
export class BugCardComponent implements OnInit {
  @Input() bug: Bug
  @Input() projectId: string
  @Output() deleteBug: EventEmitter<Bug> = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  onDelete() {
    this.deleteBug.emit(this.bug)
  }

}
