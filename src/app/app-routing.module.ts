import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatDashboardComponent } from './mat-dashboard/mat-dashboard.component';
import { MatLoginComponent } from './mat-dashboard/mat-login/mat-login.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: 'full' },
  { path: "login", component: LoginPageComponent },
  { path: "matlogin", component: MatLoginComponent },
  { path: "matdash/:username", component: MatDashboardComponent },
  { path: "dashboard/:uname", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
