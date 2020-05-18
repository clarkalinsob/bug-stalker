import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { AuthService } from 'src/app/auth.service'
import { BugService } from 'src/app/services/bug.service'
import { ProjectService } from 'src/app/services/project.service'

import { Bug } from 'src/app/models/bug'

@Component({
  selector: 'app-bug-card',
  templateUrl: './bug-card.component.html',
  styleUrls: ['./bug-card.component.scss']
})
export class BugCardComponent implements OnInit {
  @Input() bug: Bug
  @Input() projectId: string
  @Output() deleteBug: EventEmitter<Bug> = new EventEmitter()

  user: any

  constructor(private auth: AuthService, private bugService: BugService, private projectService: ProjectService) {}

  ngOnInit() {
    this.auth.getUser$().subscribe(user => (this.user = user))
  }

  onDelete() {
    this.deleteBug.emit(this.bug)
  }

  updateBug(bug: Bug) {
    this.bugService.updateBug(this.projectId, this.bug._id, bug).subscribe(b => (this.bug = b))

    this.createHistoryLogs(bug, 'updated')
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
          previousState: verb === 'updated' ? this.bug.name : null,
          currentState: bug.name
        },
        date: Date.now()
      }
    }

    this.projectService.updateLogs(this.projectId, history).subscribe()
  }
}
