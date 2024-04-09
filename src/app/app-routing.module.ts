import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './component/main/main.component';
import { LoginComponent } from './component/login/login.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UsersComponent } from './component/users/users.component';


const routes: Routes = [
  {path: '', component: MainComponent, children: [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component: PagenotfoundComponent, pathMatch: 'full', canActivate: [AuthGuard] }
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
