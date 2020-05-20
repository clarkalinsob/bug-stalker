import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import Pusher from 'pusher-js'

import { GlobalConstants } from '../global-constants'
import { Project } from '../models/project'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  api: string = `${GlobalConstants.serverUrl}/api/v1/projects`
  realtimeData: Subject<any> = new Subject<any>()
  pusherClient: Pusher

  constructor(private http: HttpClient) {
    const PUSHER_APP_ID = '8b85aee5ce4c8058f871'
    const PUSHER_APP_CLUSTER = 'ap1'

    this.pusherClient = new Pusher(PUSHER_APP_ID, { cluster: PUSHER_APP_CLUSTER })
    const channel = this.pusherClient.subscribe('realtime-projects')

    channel.bind('logs', data => this.realtimeData.next(data))
  }

  getProjectRealtime$(): Observable<any> {
    return this.realtimeData.asObservable()
  }

  getProjects$(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.api}`)
  }

  getProject$(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.api}/${projectId}`)
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.api}`, project)
  }

  updateProject$(project: Project): Observable<Project> {
    return this.http.patch<Project>(`${this.api}/${project._id}`, project)
  }

  deleteProject$(project: Project): Observable<Project> {
    return this.http.delete<Project>(`${this.api}/${project._id}`)
  }

  updateLogs$(projectId: string, log: any): Observable<any> {
    return this.http.patch<any>(`${this.api}/${projectId}/logs`, log)
  }

  getMembers$(projectId: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${projectId}/members`)
  }

  updateMembers$(projectId: string, members: any[]): Observable<any> {
    return this.http.patch<any>(`${this.api}/${projectId}/members`, members)
  }
}
