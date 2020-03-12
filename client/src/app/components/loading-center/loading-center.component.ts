import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-loading-center',
  templateUrl: './loading-center.component.html',
  styleUrls: ['./loading-center.component.scss']
})
export class LoadingCenterComponent implements OnInit {
  loggedIn: boolean

  constructor() {}

  ngOnInit() {}

}
