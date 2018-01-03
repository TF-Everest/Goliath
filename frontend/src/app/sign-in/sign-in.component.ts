import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment"

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  login_url: string

  constructor() {
    this.login_url = environment.api_address + '/openid/steam'
  }

  ngOnInit() {
  }

}
