import { Component, OnInit, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BugService } from 'src/app/services/bug.service';

import { Bug } from 'src/app/models/bug';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {
  @Input() projectId: string

  bugId: string
  bugs: Bug[]
  pending: Bug[]
  inProgress: Bug[]
  forReview: Bug[]
  done: Bug[]

  constructor (private bugService: BugService) {}

  ngOnInit() {
    // Get all bugs of the project
    this.bugService.getBugs(this.projectId).subscribe(bugs => {
      this.bugs = bugs
      this.pending = this.bugs.filter(b => b.status === 'pending')
      this.inProgress = this.bugs.filter(b => b.status === 'in progress')
      this.forReview = this.bugs.filter(b => b.status === 'for review')
      this.done = this.bugs.filter(b => b.status === 'done')
    })
  }

  drop(event: CdkDragDrop<any[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    
    const selectedBug = event.container.data.filter(c => c._id === this.bugId)
  }

  onMouseDown(bugId: string) {
    this.bugId = bugId
  }
}
