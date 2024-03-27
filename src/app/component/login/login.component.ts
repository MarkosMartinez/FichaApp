import { Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  btnLogin: boolean = false;
  email: string = "";
  password: string = "";


  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.checkLogueo();

  }

  checkLogueo(){
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }else{
      this.btnLogin = true;
    }
  }

  iniciarSesion() {
    this.btnLogin = false;
    this.authService.iniciarSesion(this.email, this.password).subscribe(resultado =>{
      if(resultado){
        this.router.navigate(['/dashboard']);
      }else{
        //TODO Mostrar mensaje de error
        this.btnLogin = true;
      }
    });
  }

}
