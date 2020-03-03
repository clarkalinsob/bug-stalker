import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Project } from '../models/project'

const token = ''
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  serverUrl:string = 'http://localhost:5000'

  constructor(private http:HttpClient) {}

  getProjects():Observable<Project[]> {
    return this.http.get<Project[]>(`${this.serverUrl}/api/v1/projects`)
  }

  deleteProject(project: Project):Observable<Project> {
    return this.http.delete<Project>(`${this.serverUrl}/api/v1/projects/${project._id}`, httpOptions)
  }
}
