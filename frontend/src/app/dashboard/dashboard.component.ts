import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from '@angular/core'
import { JwtHelper } from "angular2-jwt"
import 'rxjs/add/operator/map'
import { environment } from "../../environments/environment"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private jwt_helper: JwtHelper
  private is_loading: boolean = true
  private data: any

  constructor(public http: HttpClient) {
    this.jwt_helper = new JwtHelper()
  }

  ngOnInit() {
    let token = this.jwt_helper.decodeToken(localStorage.getItem("token"))

    this.getUserData(token.user_id)
      .subscribe((data) => {
        this.data = data
      })
  }

  getUserData(user_id: number) {
    this.is_loading = true
    return this.http.get(`${environment.api_address}/users/${user_id}`).map((res: any) => {
      this.is_loading = false
      return res.data
    })
  }

}
