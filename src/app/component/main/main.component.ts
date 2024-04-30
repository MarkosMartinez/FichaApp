import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from "@ngx-translate/core";
import { AlertComponent } from '../alert/alert.component';
import { Title } from "@angular/platform-browser";
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDrawerContainer, MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    standalone: true,
    imports: [MatDrawerContainer, MatToolbar, MatIconButton, MatIcon, MatDrawer, NgClass, RouterLink, RouterOutlet]
})
export class MainComponent {
  config: any;
  app_name = 'FichaApp';
  isPinned: boolean = true;
  seleccion: number = 0;
  isMobile: boolean = false;
  
  constructor(private authService: AuthService, private title: Title, public dialog: MatDialog, private translate: TranslateService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.aplicarConfig();  
    this.seleccion = Number(localStorage.getItem("seleccion"));
    this.detectMobileDevice();
  }

  detectMobileDevice() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    this.isMobile = /mobile|iphone|ipad|android|samsung/.test(userAgent);
    if(this.isMobile){
      this.pin();
    }
  }  

  aplicarConfig(){
    this.config = localStorage.getItem("config");
    //console.log(this.config);
    if(this.config && this.config != 'undefined'){
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
        localStorage.removeItem("seleccion");
        this.router.navigate(['login']);
      }else{
        let dialogRef = this.dialog.open(AlertComponent, {
          height: '200px',
          width: '400px',
          data: {btn: 2, msg: this.translate.instant('MAIN.error_logout'), title: "ERROR"}
        });
        dialogRef.afterClosed().subscribe(result => {
         if (result == "Ok"){
          this.cookieService.delete('token');
          this.cookieService.delete('name');
          this.cookieService.delete('role');
          localStorage.removeItem("seleccion");
          this.router.navigate(['login']);
         }
        });
        
      }
    });
  }

  pin(){
    this.isPinned = !this.isPinned;
  }

  seleccionar(seleccion: number){
    this.seleccion = seleccion;
    localStorage.setItem("seleccion", String(seleccion));

  }
}
