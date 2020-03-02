import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import axios from 'axios'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: []

  constructor(public auth: AuthService) {
    this.projects = []
  }

  async ngOnInit() {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik4wSTVPRVkwTnpFM1JqUTRPVE0xUkRjNFJrWXlPRGd3TjBSRU4wRXpORE15UWtSQk5FRXpRUSJ9.eyJpc3MiOiJodHRwczovL2VnYmVydGFwcHMuYXV0aDAuY29tLyIsInN1YiI6IjA3dVg4dmhrdVYyZWVUSTFtZHR4eUxLM1hjcWxaUTZiQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2J1Z3N0YWxrZXIuZWdiZXJ0YXBwcy5jb20vYXBpL3YxLyIsImlhdCI6MTU4MzE0NjU1NywiZXhwIjoxNTgzMjMyOTU3LCJhenAiOiIwN3VYOHZoa3VWMmVlVEkxbWR0eHlMSzNYY3FsWlE2YiIsInNjb3BlIjoiYnVnc3RhbGtlcjpyZWFkOnByb2plY3RzIGJ1Z3N0YWxrZXI6Y3JlYXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6dXBkYXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6ZGVsZXRlOnByb2plY3RzIGJ1Z3N0YWxrZXI6cmVhZDpidWdzIGJ1Z3N0YWxrZXI6Y3JlYXRlOmJ1Z3MgYnVnc3RhbGtlcjp1cGRhdGU6YnVncyBidWdzdGFsa2VyOmRlbGV0ZTpidWdzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOlsiYnVnc3RhbGtlcjpyZWFkOnByb2plY3RzIiwiYnVnc3RhbGtlcjpjcmVhdGU6cHJvamVjdHMiLCJidWdzdGFsa2VyOnVwZGF0ZTpwcm9qZWN0cyIsImJ1Z3N0YWxrZXI6ZGVsZXRlOnByb2plY3RzIiwiYnVnc3RhbGtlcjpyZWFkOmJ1Z3MiLCJidWdzdGFsa2VyOmNyZWF0ZTpidWdzIiwiYnVnc3RhbGtlcjp1cGRhdGU6YnVncyIsImJ1Z3N0YWxrZXI6ZGVsZXRlOmJ1Z3MiXX0.YDS5qzEzgZ7MYdNAwztaJ2fxr-rWZczlwFS1d90Vo0hyRPP6mqbQzt0yMNnYPorZ4PS6rYGw3ARmCsvj5iMZo3IjqzLgMtxZr8BbFeFzBNAG1vrZYhC-qYScK_JZJRXywbLDjKAtZfNgwMceKTi_etv5Gn2TcrO03NHMXvBiEZhy0CdfgBtgNvaf4-W3kuzF6msI5AtxtxdfNjMPne3rGjsWe3Vr5GVQPLVrW0bLtsUsEpMr0F_tnP8mga0giT69nV7i4gvjR4dpywzkw8QgKEJAlhgOb1QXKHiIXJCWVWzcghHarCa-lH9SMHtOXmBeJhQvxTc6WjdES5dBpNMscg'
    const result = await axios.get('http://localhost:5000/api/v1/projects/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); 

    this.projects = result.data
  }

}
