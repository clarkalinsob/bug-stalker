import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ProjectService } from 'src/app/services/project.service'

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss']
})
export class AddMemberModalComponent implements OnInit {
  @Input() projectId: string
  @Input() members: any[]
  @Output() updateMembers: EventEmitter<any[]> = new EventEmitter()

  loading: boolean
  isValid: boolean
  mappedUsers: any[]
  createdBy: any

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.isValid = false
  }

  onOpen(event: any) {
    if (this.isValid) this.isValid = !this.isValid

    this.loading = true
    this.mappedUsers = []
    this.createdBy = this.members[0]

    this.projectService.getMembers$(this.projectId).subscribe(data => {
      data.users.forEach(user => {
        this.mappedUsers.push({
          userId: user.user_id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          checked: this.members.filter(m => m.userId === user.user_id).length > 0 ? true : false,
          disabled: this.createdBy.userId === user.user_id ? true : false
        })
      })

      this.loading = false
    })
  }

  onSubmit() {
    const selectedUsers = this.mappedUsers.filter(user => user.checked)

    this.updateMembers.emit(selectedUsers)

    this.isValid = !this.isValid
  }
}
