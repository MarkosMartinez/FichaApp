import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ConfigComponent } from './components/config/config.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AbsencesComponent } from './components/absences/absences.component';


const routes: Routes = [
  { path: '', component: MainComponent, children: [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'absences', component: AbsencesComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { roles: ['manager']} },
  { path: 'config', component: ConfigComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { roles: ['manager']} },
  { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component: PagenotfoundComponent, pathMatch: 'full', canActivate: [AuthGuard] }
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})], //{useHash: true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
