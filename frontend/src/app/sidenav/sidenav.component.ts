import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from "../active-user.service"

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private is_loading: boolean = true
  private current_user

  constructor(private activeUserService: ActiveUserService) { }

  ngOnInit() {
    this.is_loading = true

    this.activeUserService.getCurrentUser().subscribe((data) => {
      this.current_user = data
      this.is_loading = false
    })
  }

}
