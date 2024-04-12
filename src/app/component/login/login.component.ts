import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  hide: boolean = true;


  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.checkLogueo();

  }

  checkLogueo(){
    if(this.authService.isAuthenticated()){
      this.router.navigate(['dashboard']);
    }else{
      this.btnLogin = true;
    }
  }

  iniciarSesion() {
    this.btnLogin = false;
    this.authService.iniciarSesion(this.email, this.password).subscribe(resultado =>{
      if(resultado){
        this.router.navigate(['dashboard']);
      }else{
        //TODO Mostrar mensaje de error
        this.btnLogin = true;
      }
    });
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.iniciarSesion();
    }
  }

}
