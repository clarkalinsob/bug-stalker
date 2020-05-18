import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import Pusher from 'pusher-js'

import { GlobalConstants } from '../global-constants'
import { Bug } from '../models/bug'

@Injectable({
  providedIn: 'root'
})
export class BugService {
  api: string = `${GlobalConstants.serverUrl}/api/v1/bugs`
  realtimeData: Subject<any> = new Subject<any>()
  pusherClient: Pusher

  constructor(private http: HttpClient) {
    const PUSHER_APP_ID = '8b85aee5ce4c8058f871'
    const PUSHER_APP_CLUSTER = 'ap1'

    this.pusherClient = new Pusher(PUSHER_APP_ID, { cluster: PUSHER_APP_CLUSTER })
    const channel = this.pusherClient.subscribe('realtime-bugs')

    channel.bind('create', data => this.realtimeData.next(data))
    channel.bind('update', data => this.realtimeData.next(data))
    channel.bind('delete', data => this.realtimeData.next(data))
    channel.bind('drag-drop', data => this.realtimeData.next(data))
  }

  dragDrop$(projectId: any, pending: any, inProgress: any, forReview: any, done: any): Observable<any> {
    const data = {
      projectId,
      pending,
      inProgress,
      forReview,
      done
    }

    return this.http.post(`${this.api}/${projectId}/drag-drop`, data)
  }

  getBugRealtime$(): Observable<any> {
    return this.realtimeData.asObservable()
  }

  getBugs$(projectId: string): Observable<Bug[]> {
    return this.http.get<Bug[]>(`${this.api}/${projectId}`)
  }

  createBug$(projectId: string, data: any): Observable<Bug> {
    return this.http.post<Bug>(`${this.api}/${projectId}`, data)
  }

  updateBug$(projectId: string, bugId: string, data: any): Observable<Bug> {
    return this.http.patch<Bug>(`${this.api}/${projectId}/${bugId}`, data)
  }

  deleteBug$(projectId: string, bugId: string) {
    return this.http.delete<Bug>(`${this.api}/${projectId}/${bugId}`)
  }
}
