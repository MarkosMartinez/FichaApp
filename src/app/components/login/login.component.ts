import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MainComponent } from '../main/main.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [FormsModule, MatFormField, MatLabel, MatInput, MatIcon, MatSuffix, MatIconButton, MatButton, TranslateModule]
})
export class LoginComponent {

  btnLogin: boolean = false;
  email: string = '';
  password: string = '';
  hide: boolean = true;
  title: string = "FichaApp";
  config: any;


  constructor(private authService: AuthService, private translate: TranslateService, public dialog: MatDialog, private router: Router, private mainComponent: MainComponent){

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
        this.mainComponent.getAbsenceBadge();
        this.router.navigate(['dashboard']);
      }else{
        this.dialog.open(AlertComponent, {
          height: '200px',
          width: '400px',
          data: {btn: 1, msg: this.translate.instant('LOGIN.label_invalid_credentials_error'), title: this.translate.instant('ALERT.label_error').toUpperCase()}
        });
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
