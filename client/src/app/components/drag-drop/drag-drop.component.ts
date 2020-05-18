import { Component, OnInit, Input } from '@angular/core'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Subscription } from 'rxjs'

import { AuthService } from 'src/app/auth.service'
import { BugService } from 'src/app/services/bug.service'
import { ProjectService } from 'src/app/services/project.service'

import { Bug } from 'src/app/models/bug'

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  @Input() projectId: string

  bugSubscription: Subscription
  bug: Bug
  pending: Bug[]
  inProgress: Bug[]
  forReview: Bug[]
  done: Bug[]
  user: any
  previousState: string

  constructor(private auth: AuthService, private bugService: BugService, private projectService: ProjectService) {
    this.pending = []
    this.inProgress = []
    this.forReview = []
    this.done = []

    this.bugSubscription = bugService.getBugRealtime$().subscribe((data: any) => {
      if (data.event === 'create' && data.projectId === this.projectId) this[data.bug.status].push(data.bug)
      if (data.event === 'update' && data.projectId === this.projectId)
        this[data.bug.status] = this[data.bug.status].map(b => (b._id === data.bug._id ? data.bug : b))
      if (data.event === 'delete' && data.projectId === this.projectId)
        this[data.bug.status] = this[data.bug.status].filter(b => b._id != data.bug._id)
      if (data.event === 'drag-drop' && data.projectId === this.projectId) {
        this.pending = data.pending
        this.inProgress = data.inProgress
        this.forReview = data.forReview
        this.done = data.done
      }
    })
  }

  ngOnInit() {
    // Initialize user
    this.auth.getUser$().subscribe(user => (this.user = user))

    // Get all bugs of the project
    this.bugService.getBugs$(this.projectId).subscribe(bugs => {
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
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)

      // Reset Indexes
      this.resetIndexes(event.container.data)
      this.bug.status = status
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)

      // Slice the array and update bug
      this.sliceAndUpdate(event.container.data, event.currentIndex, status)
      this.previousState = this.bug.status
      this.bug.status = status

      this.createHistoryLogs(this.bug, 'updated')
    }
    this.bugService.dragDrop$(this.projectId, this.pending, this.inProgress, this.forReview, this.done).subscribe()
  }

  createBug(bug: Bug) {
    this.bugService.createBug$(this.projectId, bug).subscribe()

    // Created log
    this.createHistoryLogs(bug, 'created')
  }

  deleteBug(bug: Bug) {
    // Delete the bug from the server
    this.bugService.deleteBug$(this.projectId, bug._id).subscribe()

    // Deleted log
    this.createHistoryLogs(bug, 'deleted')

    // Reset Indexes
    this.resetIndexes(this[bug.status])
  }

  onMouseDown(bug: Bug) {
    this.bug = bug
  }

  sortBugs(bugs: Bug[]) {
    bugs.sort((a, b) => {
      return a._index - b._index
    })
    return bugs
  }

  resetIndexes(bugs: Bug[]) {
    bugs.forEach((item, index) => {
      const bug = {
        _index: index
      }

      // Update Bug
      this.bugService.updateBug$(this.projectId, item._id, bug).subscribe()
    })
  }

  sliceAndUpdate(bugs: Bug[], index: number, status: string) {
    const sliced = bugs.slice(index)
    let indexCount = 0

    sliced.forEach(item => {
      const bug = {
        _index: index + indexCount,
        status
      }

      this.bugService.updateBug$(this.projectId, item._id, bug).subscribe()
      indexCount++
    })

    return
  }

  createHistoryLogs(bug, verb) {
    const history = {
      log: {
        subject: {
          userId: this.user.sub,
          name: this.user.name,
          email: this.user.email,
          picture: this.user.picture
        },
        predicate: {
          verb,
          object: bug.name,
          objectType: 'bug',
          previousState: verb === 'updated' ? this.previousState : null,
          currentState: bug.status
        },
        date: Date.now()
      }
    }

    this.projectService.updateLogs$(this.projectId, history).subscribe()
  }
}
