import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router"

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let token = params['token']

      localStorage.setItem('token', token)
      this.router.navigate(["dashboard"])
    })
  }

}
