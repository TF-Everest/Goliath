import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { tokenNotExpired } from "angular2-jwt"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return tokenNotExpired()
  }

  signOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/sign-in'])
  }

}
