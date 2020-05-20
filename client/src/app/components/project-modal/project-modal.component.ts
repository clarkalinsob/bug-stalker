import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Project } from '../../models/project'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  @Input() project: Project
  @Output() createProject: EventEmitter<any> = new EventEmitter()
  @Output() updateProject: EventEmitter<any> = new EventEmitter()

  name: string
  description: string
  error: string
  isValid: boolean
  isUpdate: boolean
  user: any

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.name = ''
    this.isValid = false
    if (this.project) this.isUpdate = !this.isUpdate
    this.auth.getUser$().subscribe(user => (this.user = user))
  }

  onSubmit() {
    if (this.name.trim() === '') return (this.error = '*Name is required.')

    const createdBy = {
      userId: this.user.sub,
      name: this.user.name,
      email: this.user.email,
      picture: this.user.picture
    }

    const project = {
      name: this.name,
      description: this.description,
      members: [createdBy]
    }

    this.isValid = !this.isValid

    // Update Project
    if (this.project) {
      const updatedProject = Object.assign({}, project, { _id: this.project._id })
      this.updateProject.emit(updatedProject)
    }

    // Create Project
    else this.createProject.emit(project)
  }

  onOpen(event: any) {
    // Reset Form Input and Close Modal
    if (this.isValid) {
      this.isValid = !this.isValid
      this.resetInput()
    }

    // If Update Modal on Open
    if (this.project) {
      this.name = this.project.name
      this.description = this.project.description
    }
  }

  resetInput() {
    this.name = ''
    this.description = ''
    this.error = ''
  }
}
