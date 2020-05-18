import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { ProjectService } from '../../services/project.service'
import { Project } from '../../models/project'

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project
  @Output() deleteProject: EventEmitter<Project> = new EventEmitter()

  constructor(private projectService: ProjectService) {}

  ngOnInit() {}

  updateProject(project: Project) {
    this.projectService.updateProject$(project).subscribe(p => (this.project = p))
  }

  onDelete(project: Project) {
    this.deleteProject.emit(project)
  }
}
