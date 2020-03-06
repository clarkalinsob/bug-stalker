import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Bug } from '../models/bug'

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik4wSTVPRVkwTnpFM1JqUTRPVE0xUkRjNFJrWXlPRGd3TjBSRU4wRXpORE15UWtSQk5FRXpRUSJ9.eyJpc3MiOiJodHRwczovL2VnYmVydGFwcHMuYXV0aDAuY29tLyIsInN1YiI6IjA3dVg4dmhrdVYyZWVUSTFtZHR4eUxLM1hjcWxaUTZiQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2J1Z3N0YWxrZXIuZWdiZXJ0YXBwcy5jb20vYXBpL3YxLyIsImlhdCI6MTU4MzQ5MjAzMSwiZXhwIjoxNTgzNTc4NDMxLCJhenAiOiIwN3VYOHZoa3VWMmVlVEkxbWR0eHlMSzNYY3FsWlE2YiIsInNjb3BlIjoiYnVnc3RhbGtlcjpyZWFkOnByb2plY3RzIGJ1Z3N0YWxrZXI6Y3JlYXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6dXBkYXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6ZGVsZXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6cmVhZDpidWdzIGJ1Z3N0YWxrZXI6Y3JlYXRlOmJ1Z3MgYnVnc3RhbGtlcjp1cGRhdGU6YnVncyBidWdzdGFsa2VyOmRlbGV0ZTpidWdzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOlsiYnVnc3RhbGtlcjpyZWFkOnByb2plY3RzIiwiYnVnc3RhbGtlcjpjcmVhdGU6cHJvamVjdHMiLCJidWdzdGFsa2VyOnVwZGF0ZTpwcm9qZWN0cyIsImJ1Z3N0YWxrZXI6ZGVsZXRlOnByb2plY3RzIiwiYnVnc3RhbGtlcjpyZWFkOmJ1Z3MiLCJidWdzdGFsa2VyOmNyZWF0ZTpidWdzIiwiYnVnc3RhbGtlcjp1cGRhdGU6YnVncyIsImJ1Z3N0YWxrZXI6ZGVsZXRlOmJ1Z3MiXX0.MUdTXRBrTs8BprJBg6zCorS6-HPsXL5gbhlnpranLBGhBE6AXIr_WYJ5QgfejKpob1cEwRoefQiGZYas9wwglJ6dpAM5A4Ejw0242bmdQ7CvP804y9HkGS704Ozt-d5WEF3fR7sFR6iXf-OEj_I7op6oY63HY4Kv66DvOzbVIyy3-kE2CbQBXoUcQITzg66ok74hqmQ26Ab5S8XTfA07G2dK8I4nvP_hJ4zYs7hM-7fhsktwt239UpAd_Id8_GnLErGzb1UTj-J4cuCrQv8KJMXfVUrD0Xz1yeD_aqIv7XQMsJTY6lV_SkaEoDYAWxuQcpBK0VjWRcmIRgIqhw1n-g'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class BugService {
  api: string = 'http://localhost:5000/api/v1/bugs'

  constructor(private http: HttpClient) {}

  getBugs(projectId: string):Observable<Bug[]> {
    return this.http.get<Bug[]>(`${this.api}/${projectId}`, httpOptions)
  }

  updateBug(projectId: string, bugId: string, data: any):Observable<Bug> {
    return this.http.patch<Bug>(`${this.api}/${projectId}/${bugId}`, data,httpOptions)
  }

}
