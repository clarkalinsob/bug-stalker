import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProjectService } from 'src/app/services/project.service'
import { BugService } from 'src/app/services/bug.service'

import { Project } from 'src/app/models/project'
import { Bug } from 'src/app/models/bug'

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  bugs: Bug[]
  project: Project
  projectId: string

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService, private bugService: BugService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => (this.projectId = params.get('id')))

    // Get the project
    this.projectService.getProject$(this.projectId).subscribe(project => (this.project = project))

    // Get all bugs of the project
    this.bugService.getBugs$(this.projectId).subscribe(bugs => (this.bugs = bugs))
  }

  updateProjectDetails(project: Project) {
    this.projectService.updateProject$(project).subscribe(proj => (this.project = proj))
  }

  updateMembers(members: any[]) {
    this.projectService.updateMembers$(this.projectId, members).subscribe(mem => (this.project.members = mem))
  }
}
