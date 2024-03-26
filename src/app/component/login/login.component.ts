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
    console.log("Correo/Contraseña: " + this.email + " / " + this.password);
    if(this.authService.iniciarSesion(this.email, this.password)){
      console.log("Logueado correctamente!")
    }else{
      this.btnLogin = true;
    }
  }

}
