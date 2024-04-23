import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from "@ngx-translate/core";
import { AlertComponent } from '../alert/alert.component';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  config: any;
  app_name = 'FichaApp';
  isPinned: boolean = true;
  seleccion: number = 0;
  
  constructor(private authService: AuthService, private title: Title, public dialog: MatDialog, private translate: TranslateService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.aplicarConfig();  

  }

  aplicarConfig(){
    this.config = localStorage.getItem("config");
    //console.log(this.config);
    if(this.config && this.config != undefined){
      this.config = JSON.parse(this.config);
      this.app_name = this.config[0].app_name;
      this.title.setTitle(this.config[0].app_name);
    }else
      this.app_name = 'FichaApp';
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isManager(): boolean {
    if(this.cookieService.get('role') == "manager") return true;
    return false;
  }

  cerrarSesion(){
    this.authService.cerrarSesion().subscribe(resultado =>{
      if(resultado){
        this.cookieService.delete('token');
        this.cookieService.delete('name');
        this.cookieService.delete('role');
        this.router.navigate(['login']);
      }else{
        let dialogRef = this.dialog.open(AlertComponent, {
          height: '250px',
          width: '400px',
          data: {btn: 2, msg: this.translate.instant('MAIN.error_logout')}
        });
        dialogRef.afterClosed().subscribe(result => {
         if (result == "Ok"){
          this.cookieService.delete('token');
          this.cookieService.delete('name');
          this.cookieService.delete('role');
          this.router.navigate(['login']);
         }
        });
        
      }
    });
  }

  pin(){
    this.isPinned = !this.isPinned;
  }

}
