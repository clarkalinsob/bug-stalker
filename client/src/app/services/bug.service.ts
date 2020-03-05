import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Bug } from '../models/bug'

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik4wSTVPRVkwTnpFM1JqUTRPVE0xUkRjNFJrWXlPRGd3TjBSRU4wRXpORE15UWtSQk5FRXpRUSJ9.eyJpc3MiOiJodHRwczovL2VnYmVydGFwcHMuYXV0aDAuY29tLyIsInN1YiI6IjA3dVg4dmhrdVYyZWVUSTFtZHR4eUxLM1hjcWxaUTZiQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2J1Z3N0YWxrZXIuZWdiZXJ0YXBwcy5jb20vYXBpL3YxLyIsImlhdCI6MTU4MzM5MTAyNiwiZXhwIjoxNTgzNDc3NDI2LCJhenAiOiIwN3VYOHZoa3VWMmVlVEkxbWR0eHlMSzNYY3FsWlE2YiIsInNjb3BlIjoiYnVnc3RhbGtlcjpyZWFkOnByb2plY3RzIGJ1Z3N0YWxrZXI6Y3JlYXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6dXBkYXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6ZGVsZXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6cmVhZDpidWdzIGJ1Z3N0YWxrZXI6Y3JlYXRlOmJ1Z3MgYnVnc3RhbGtlcjp1cGRhdGU6YnVncyBidWdzdGFsa2VyOmRlbGV0ZTpidWdzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOlsiYnVnc3RhbGtlcjpyZWFkOnByb2plY3RzIiwiYnVnc3RhbGtlcjpjcmVhdGU6cHJvamVjdHMiLCJidWdzdGFsa2VyOnVwZGF0ZTpwcm9qZWN0cyIsImJ1Z3N0YWxrZXI6ZGVsZXRlOnByb2plY3RzIiwiYnVnc3RhbGtlcjpyZWFkOmJ1Z3MiLCJidWdzdGFsa2VyOmNyZWF0ZTpidWdzIiwiYnVnc3RhbGtlcjp1cGRhdGU6YnVncyIsImJ1Z3N0YWxrZXI6ZGVsZXRlOmJ1Z3MiXX0.XCUWjgjg6PLeOC8qgL4NsQgzsPs7OPUaEqDQWqauNgsYkInlMvJx8ARdezTub7EkrFKb7MT6QYPyqnwaTb972egVs59eB_xiDs_xXWhJwZhk7yMG_9ii-8D9K_SI9V4fqj8BlyuR6pLXILJ18fwapQBadg-nwIcwcOYO-JIsN2crfU8sg-ghugr7fhIrwfRKFqhp1IYS2xdp7v0vUJJiiJKyS0mk-mCBJz9dY49UJPk5nahZb2WHYoV6CdTa9U-Ma-DLs9rm0sIcE1eiXgydLfPP4--R-oklQd0zOVPDQ94S04GyOFOUTM1uPJPf-I1-7aiGovzKNy82BBY2pumJEw'
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
