import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from '@angular/core'
import { JwtHelper } from "angular2-jwt"
import 'rxjs/add/operator/map'
import { environment } from "../../environments/environment"
import { ActiveUserService } from "../active-user.service"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private jwt_helper: JwtHelper
  private is_loading: boolean = true
  private current_user: any

  constructor(private http: HttpClient, private activeUserService: ActiveUserService) {
    this.jwt_helper = new JwtHelper()
  }

  ngOnInit() {
    this.is_loading = true
    this.activeUserService.getCurrentUser().subscribe((data) => {
      this.current_user = data

      this.is_loading = false
    })
  }

}
