import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [FormsModule, MatFormField, MatLabel, MatInput, MatIcon, MatSuffix, MatIconButton, MatButton, TranslateModule]
})
export class LoginComponent {

  btnLogin: boolean = false;
  email: string = "";
  password: string = "";
  hide: boolean = true;
  title: string = "FichaApp";
  config: any;


  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.checkLogueo();
    
    this.config = localStorage.getItem("config");
    if(this.config && this.config != undefined){
      this.config = JSON.parse(this.config);
      this.title = this.config[0].app_name;
    }

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
