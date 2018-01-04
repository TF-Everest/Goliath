import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { tokenNotExpired } from "angular2-jwt"
import { ActiveUserService } from "../active-user.service"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private is_loading: boolean = true
  private current_user

  constructor(private router: Router, private activeUserService: ActiveUserService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return tokenNotExpired()
  }

  signOut() {
    localStorage.removeItem('token')
    this.activeUserService.clearUser()
    this.router.navigate(['/sign-in'])
  }

}
