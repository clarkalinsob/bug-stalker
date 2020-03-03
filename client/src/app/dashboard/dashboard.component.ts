import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { ProjectService } from '../services/project.service'
import { Project } from '../models/project'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: Project[]

  constructor(public auth: AuthService, private projectService: ProjectService) {
    this.projects = []
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects
    })
  }

  deleteProject(project: Project) {
    this.projects = this.projects.filter(p => p._id !== project._id)
    this.projectService.deleteProject(project).subscribe()
  }

}
