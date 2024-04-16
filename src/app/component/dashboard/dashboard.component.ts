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
  ficharHabilitado: boolean = false;

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

  obtenerRegistros(fichado: boolean = false) {
    this.punchinoutService.getSignings().subscribe(resultado =>{
      if(resultado){
        this.registros = resultado;
        if(fichado)
          this.checkEntradaSalida(true);
        else
          this.checkEntradaSalida();
        //console.log(resultado);
      }else{
        //TODO Mensaje de error?
      }
    });
  }

  checkEntradaSalida(fichado: boolean = false){
    if(this.registros[0]["exit_time"] != null)
      this.modoEntrada = true;
    else
      this.modoEntrada = false;
    this.ficharHabilitado = true;
    if(fichado){
      let message = this.modoEntrada ? this.translate.instant('DASHBOARD.punchin_successfully') : this.translate.instant('DASHBOARD.punchout_successfully');
      this._snackBar.open(message, this.translate.instant('CONFIG.accept_snack'), {
        duration: 3 * 1000, // 3 Segundos
      });

    }
    //console.log("Modo entrada: " + this.modoEntrada);
  }

  fichar(){
    this.punchinoutService.puchInOut().subscribe(resultado =>{
      //console.log(resultado);
      if(resultado){
        this.obtenerRegistros(true);
      }else{
        //TODO Mensaje de error?
      }
    });
  }

}
