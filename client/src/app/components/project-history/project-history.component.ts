import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth.service';
import { ProjectService } from 'src/app/services/project.service';

import { Log } from 'src/app/models/log';

@Component({
  selector: 'app-project-history',
  templateUrl: './project-history.component.html',
  styleUrls: ['./project-history.component.scss']
})
export class ProjectHistoryComponent implements OnInit {
  @Input() projectId: string
  @Input() logs: Log[]
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator

  logsSubscription: Subscription
  dataSource: any
  displayedColumns: string[] = ['history']

  constructor(private auth: AuthService, private projectService: ProjectService) {
    this.logsSubscription = projectService.getProjectRealtime().subscribe((data: any) => {
      if (data.event === 'logs' && data.projectId === this.projectId) {
        this.dataSource.data.unshift(data.log)
        this.dataSource.data = [...this.dataSource.data]
      }
    })
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Log>(this.logs.reverse())
    this.dataSource.paginator = this.paginator
  }
}
