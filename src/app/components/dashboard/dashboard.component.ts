import { Component } from '@angular/core';

import { TimeService } from '../../services/time.service';
import { PunchinoutService } from '../../services/punchinout.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { timeout } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    standalone: true,
    imports: [MatProgressSpinner, MatButton, MatIcon, DatePipe, TranslateModule]
})
export class DashboardComponent {

  registros = [];
  modoEntrada: boolean = true;
  ficharHabilitado: boolean = false;
  serverTime: Date = new Date(0);
  errorTime: Date = new Date(0);
  loading: boolean = true;

  constructor(private translate: TranslateService, public dialog: MatDialog, private timeService: TimeService, private punchinoutService: PunchinoutService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.obtenerHora();
    this.obtenerRegistros();
  }

  obtenerHora(){
    this.timeService.getTime().subscribe(resultado =>{
      if(resultado && resultado != this.serverTime){
        this.serverTime = resultado;
        this.serverTime.setSeconds(this.serverTime.getSeconds() + 1);
        this.actualizarHora();
      }
    });
  }

  actualizarHora() {
    setInterval(() => {
      let nuevaFecha = new Date(this.serverTime.getTime());
      nuevaFecha.setSeconds(nuevaFecha.getSeconds() + 1);
      this.serverTime = nuevaFecha;
    }, 1000);
  }

  obtenerRegistros(fichado: boolean = false) {
    this.punchinoutService.getSignings().subscribe(resultado =>{
      if(resultado){
        this.registros = resultado;
        if(this.registros.length > 0){
        if(fichado)
          this.checkEntradaSalida(true);
        else
          this.checkEntradaSalida();
        setTimeout(() => {
          this.cargarBarra();
        }, 10);
        }else{
          this.ficharHabilitado = true;
        }
        this.loading = false;
        //console.log(resultado);
      }else{
        this.dialog.open(AlertComponent, {
          height: '200px',
          width: '400px',
          data: {btn: 1, msg: this.translate.instant('DASHBOARD.label_error'), title: this.translate.instant('ALERT.label_error').toUpperCase()}
        });
        this.loading = false;
      }
    });
  }

  cargarBarra(){
    let start: Date = new Date(this.registros[0]["enter_time"]);
    let end: Date = this.registros[0]["exit_time"] != null ? new Date(this.registros[0]["exit_time"]) : new Date();
    if(start.getDate() < new Date().getDate()) start.setHours(0);
    let startHour = start.getHours();
    let endHour = end.getHours();
    // console.log("Start/end: " + startHour + " / " + endHour);
    let barra;

    for (let i = startHour; i < endHour; i++) {
      barra = document.getElementById("barra_" + i);
      if(barra){
        barra.style.backgroundColor  = "green";
      } 
    }
    if(startHour === endHour){
      barra = document.getElementById("barra_" + startHour);
      if(barra){
        barra.style.backgroundColor  = "green";
      } 
    }
  }

  resetearBarra(){
    let barra;
    for (let i = 0; i < 24; i++) {
      barra = document.getElementById("barra_" + i);
      if(barra){
        barra.style.backgroundColor  = "darkslategray";
      } 
    }
    return true;
  }

  checkEntradaSalida(fichado: boolean = false){
    if(this.registros[0]["exit_time"] != null)
      this.modoEntrada = true;
    else
      this.modoEntrada = false;
    this.ficharHabilitado = true;
    if(fichado){
      let message = this.modoEntrada ? this.translate.instant('DASHBOARD.punchout_successfully') : this.translate.instant('DASHBOARD.punchin_successfully');
      this._snackBar.open(message, this.translate.instant('CONFIG.accept_snack'), {
        duration: 3 * 1000, // 3 Segundos
      });
      if(this.resetearBarra()) this.cargarBarra();
    }
    //console.log("Modo entrada: " + this.modoEntrada);
  }

  fichar(){
    this.punchinoutService.puchInOut().subscribe(resultado =>{
      //console.log(resultado);
      if(resultado){
        this.obtenerRegistros(true);
      }else{
        this.dialog.open(AlertComponent, {
          height: '200px',
          width: '400px',
          data: {btn: 1, msg: this.translate.instant('DASHBOARD.label_signinout_error'), title: this.translate.instant('ALERT.label_error').toUpperCase()}
        });
      }
    });
  }

}
