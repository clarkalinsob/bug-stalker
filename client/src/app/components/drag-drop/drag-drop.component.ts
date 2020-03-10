import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  bug: Bug
  pending: Bug[]
  inProgress: Bug[]
  forReview: Bug[]
  done: Bug[]

  constructor (private bugService: BugService) {}

  ngOnInit() {
    // Get all bugs of the project
    this.bugService.getBugs(this.projectId).subscribe(bugs => {
      const pending = bugs.filter(b => b.status === 'pending')
      const inProgress = bugs.filter(b => b.status === 'inProgress')
      const forReview = bugs.filter(b => b.status === 'forReview')
      const done = bugs.filter(b => b.status === 'done')

      this.pending = this.sortBugs(pending)
      this.inProgress = this.sortBugs(inProgress)
      this.forReview = this.sortBugs(forReview)
      this.done = this.sortBugs(done)
    })
  }

  drop(event: CdkDragDrop<any[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      event.container.data.forEach((item, index) => {
        const bug = { 
          _index: index 
        }
        
        // Update Bug
        this.bugService.updateBug(this.projectId, item._id, bug).subscribe()
      })
      this.bug.status = status
      
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      // Slice the array and update bug
      this.sliceAndUpdate(event.container.data, event.currentIndex, status)
      this.bug.status = status
    }
  }

  onMouseDown(bug: Bug) {
    this.bug = bug
  }

  sortBugs(bugs: Bug[]) {
    bugs.sort((a, b) => { return a._index - b._index })
    return bugs
  }

  sliceAndUpdate (bugs: Bug[], index: number, status: string) {
    const sliced = bugs.slice(index) 
    let indexCount = 0

    sliced.forEach(item => {
      const bug = {
        _index: index + indexCount,
        status
      }

      this.bugService.updateBug(this.projectId, item._id, bug).subscribe()
      indexCount++
    })

    return 
  }

  createBug(bug: Bug) {
    this.bugService.createBug(this.projectId, bug).subscribe(b => this[bug.status].push(b))
  }

  deleteBug(bug: Bug) {
    // Remove the bug from the array
    this[bug.status].splice(bug._index, 1)

    // Delete the bug from the server
    this.bugService.deleteBug(this.projectId, bug._id).subscribe(() => {
      // Update indexes
      const sliced = this[bug.status].slice(bug._index) 
      sliced.forEach(item => {
        item._index = item._index - 1
  
        this.bugService.updateBug(this.projectId, item._id, item).subscribe()
      })
    })
  }

}
