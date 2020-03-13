import { Component, OnInit, Input } from '@angular/core';

import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-tabs',
  templateUrl: './project-tabs.component.html',
  styleUrls: ['./project-tabs.component.scss']
})
export class ProjectTabsComponent implements OnInit {
  @Input() project: Project

  tabIndex: number
  name: string
  description: string

  constructor() {}

  ngOnInit() {
    this.tabIndex = 0
    this.name = this.project.name
    this.description = this.project.description
  }

}
