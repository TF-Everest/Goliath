import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { environment } from "../environments/environment"
import { ActiveUserService } from "./active-user.service"

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthGuard } from "./auth/auth-guard.service"
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthenticatorComponent } from './authenticator/authenticator.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    NavbarComponent,
    SidenavComponent,
    AuthenticatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token")
        },
        whitelistedDomains: ["localhost:8080"]
      }
    })
  ],
  providers: [
    AuthGuard,
    ActiveUserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
