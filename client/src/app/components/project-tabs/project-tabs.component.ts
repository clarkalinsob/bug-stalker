import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { Project } from 'src/app/models/project'

@Component({
  selector: 'app-project-tabs',
  templateUrl: './project-tabs.component.html',
  styleUrls: ['./project-tabs.component.scss']
})
export class ProjectTabsComponent implements OnInit {
  @Input() project: Project
  @Output() updateProjectDetails: EventEmitter<Project> = new EventEmitter()

  tabIndex: number
  name: string
  description: string

  constructor() {}

  ngOnInit() {
    this.tabIndex = 0
    this.name = this.project.name
    this.description = this.project.description
  }

  onSaveChanges() {
    const updatedProject = {
      _id: this.project._id,
      name: this.name,
      description: this.description
    }

    this.updateProjectDetails.emit(updatedProject)
  }
}
