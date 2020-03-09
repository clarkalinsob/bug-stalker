import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Bug } from '../models/bug'

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik4wSTVPRVkwTnpFM1JqUTRPVE0xUkRjNFJrWXlPRGd3TjBSRU4wRXpORE15UWtSQk5FRXpRUSJ9.eyJpc3MiOiJodHRwczovL2VnYmVydGFwcHMuYXV0aDAuY29tLyIsInN1YiI6IjA3dVg4dmhrdVYyZWVUSTFtZHR4eUxLM1hjcWxaUTZiQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2J1Z3N0YWxrZXIuZWdiZXJ0YXBwcy5jb20vYXBpL3YxLyIsImlhdCI6MTU4MzczMDczNSwiZXhwIjoxNTgzODE3MTM1LCJhenAiOiIwN3VYOHZoa3VWMmVlVEkxbWR0eHlMSzNYY3FsWlE2YiIsInNjb3BlIjoiYnVnc3RhbGtlcjpyZWFkOnByb2plY3RzIGJ1Z3N0YWxrZXI6Y3JlYXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6dXBkYXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6ZGVsZXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6cmVhZDpidWdzIGJ1Z3N0YWxrZXI6Y3JlYXRlOmJ1Z3MgYnVnc3RhbGtlcjp1cGRhdGU6YnVncyBidWdzdGFsa2VyOmRlbGV0ZTpidWdzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOlsiYnVnc3RhbGtlcjpyZWFkOnByb2plY3RzIiwiYnVnc3RhbGtlcjpjcmVhdGU6cHJvamVjdHMiLCJidWdzdGFsa2VyOnVwZGF0ZTpwcm9qZWN0cyIsImJ1Z3N0YWxrZXI6ZGVsZXRlOnByb2plY3RzIiwiYnVnc3RhbGtlcjpyZWFkOmJ1Z3MiLCJidWdzdGFsa2VyOmNyZWF0ZTpidWdzIiwiYnVnc3RhbGtlcjp1cGRhdGU6YnVncyIsImJ1Z3N0YWxrZXI6ZGVsZXRlOmJ1Z3MiXX0.aJmhvVUJYMGuEpSJ9AG_130x7oTlqrCY8bXU7Alhph7tj09tRcTA2-n6n9EiNY0h_BwxGwHZ49SMnEJ3ynxZG1LPlnnjUFbFbPKozRzo6eT57CxEnpbM0fy7tRriEqf3MHXhPaEq6YmkWGFejsM4T8hFzUP0TwAQtlfB86Tmb8e4gaYHPPtDLQ1FWDj5O7gRE2Pk3B_y3tzYQxDJsQOMZtQ77r9hmbV65_nFhFH1LtKZSgEeokht4p__VVeIMG_AZCrCGog92hcnkfYK3TKRxvw75YI-7yjtxfpqXaI2qgc9NNMJfYGxDi0wcBn2xwdU6Xzt4CkAQQIvEjk015zkPg'
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
