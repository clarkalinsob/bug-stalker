import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedIn: boolean

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth ? this.loggedIn = this.auth.loggedIn: this.loggedIn = false
  }

}
