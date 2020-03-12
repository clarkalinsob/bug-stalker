import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-project-history',
  templateUrl: './project-history.component.html',
  styleUrls: ['./project-history.component.scss']
})
export class ProjectHistoryComponent implements OnInit {
  displayedColumns: string[] = ['history']
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA)

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator
  }

}

const ELEMENT_DATA = [
  {name: 'Hydrogen'},
  {name: 'Helium'},
  {name: 'Lithium'}
]
