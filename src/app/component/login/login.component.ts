import { Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authservice: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.checkLogueo();

  }

  checkLogueo(){
    if(this.authservice.isAuthenticated()){
      this.router.navigate(['/']);
    }
  }

}
