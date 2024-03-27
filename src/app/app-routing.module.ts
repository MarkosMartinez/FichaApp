import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './component/main/main.component';
import { LoginComponent } from './component/login/login.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: PagenotfoundComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component: PagenotfoundComponent, pathMatch: 'full', canActivate: [AuthGuard] }
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
