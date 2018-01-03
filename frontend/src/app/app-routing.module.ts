import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from "./auth/auth-guard.service"
import { AuthenticatorComponent } from "./authenticator/authenticator.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { SignInComponent } from "./sign-in/sign-in.component"

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'auth/success', component: AuthenticatorComponent },
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
