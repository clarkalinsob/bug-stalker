import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
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

  mappedUsers: any[]
  loading: boolean = true
  isValid: boolean
  templatetrue: boolean = true
  templatefalse: boolean = false

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.isValid = false
  }

  onOpen(event: any) {
    if (this.isValid) this.isValid = !this.isValid

    this.loading = true
    this.mappedUsers = []
    this.projectService.getMembers$(this.projectId).subscribe(data => {
      data.users.forEach(user => {
        this.mappedUsers.push({
          userId: user.user_id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          checked: this.members.filter(m => m.userId === user.user_id).length > 0 ? true : false
        })
      })

      console.log('mapped', this.mappedUsers)
      this.loading = false
    })
  }

  onSubmit() {
    const selectedUsers = this.mappedUsers.filter(user => user.checked)

    this.projectService.updateMembers$(this.projectId, selectedUsers).subscribe(members => {
      this.updateMembers.emit(members)
    })

    this.isValid = !this.isValid
  }
}
