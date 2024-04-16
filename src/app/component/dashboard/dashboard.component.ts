import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { PunchinoutService } from '../../services/punchinout.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  registros = [];
  modoEntrada: boolean = true;

  constructor(private translate: TranslateService, private authService: AuthService, private punchinoutService: PunchinoutService, private _snackBar: MatSnackBar, private router: Router, private cookieService: CookieService){}

  ngOnInit(): void {
    this.authService.checkValidToken().subscribe(resultado =>{
      if(!resultado){
        this.cookieService.delete('token');
        this.cookieService.delete('name');
        this.router.navigate(['login']);
      }
    });

    this.obtenerRegistros();
  }

  obtenerRegistros() {
    this.punchinoutService.getSignings().subscribe(resultado =>{
      if(resultado){
        this.registros = resultado;
        this.checkEntradaSalida();
        //console.log(resultado);
      }else{
        //TODO Mensaje de error?
      }
    });
  }

  checkEntradaSalida(){
    if(this.registros[0]["exit_time"] != null)
      this.modoEntrada = true;
    else
      this.modoEntrada = false;
    //console.log("Modo entrada: " + this.modoEntrada);
  }

  fichar(){
    this.punchinoutService.puchInOut().subscribe(resultado =>{
      //console.log(resultado);
      if(resultado){
        this.obtenerRegistros();
      }else{
        //TODO Mensaje de error?
      }
    });
  }

}
