import { HttpClient } from "@angular/common/http"
import { Injectable } from '@angular/core'
import { JwtHelper } from "angular2-jwt"
import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/of"
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import { environment } from "../environments/environment"

@Injectable()
export class ActiveUserService {

  private active_user: {
    id: number,
    name: {
      first: string,
      last: string,
      full: string
    },
    email_address: string,
    steam_id: string,
    age: number,
    location: string,
    permissions: {
      is_recruiter: boolean,
      is_drill_instructor: boolean,
      is_administrator: boolean,
      is_suspended: boolean
    }
  }

  private jwt_helper: JwtHelper

  constructor(private http: HttpClient) {
    this.jwt_helper = new JwtHelper()
  }

  getCurrentUser() {

    let token = this.jwt_helper.decodeToken(localStorage.getItem("token"))

    return this.http.get(`${environment.api_address}/users/${token.user_id}`).map((res: any) => {
      this.active_user = res.data
      return res.data
    })

  }

  reportIn() {
    return this.http.post(`${environment.api_address}/users/${this.active_user.id}/accountability`, {})
      .switchMap((res: any) => {
        return this.getCurrentUser()
      })
  }

  clearUser() {
    this.active_user = undefined
  }

}
