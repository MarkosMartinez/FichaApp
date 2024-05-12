import { Component } from '@angular/core';

import { AbsencesService } from '../../services/absences.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatProgressBar } from '@angular/material/progress-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AlertComponent } from '../alert/alert.component';
import { AddabsenceComponent } from '../addabsence/addabsence.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainComponent } from '../main/main.component';


@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.css',
  standalone: true,
  imports: [CommonModule, MatProgressSpinner, MatProgressBar, MatFabButton, MatTableModule, MatIcon, TranslateModule, MatTabsModule]
})

export class AbsencesComponent {
  loading = true;
  loading2 = true;
  colums = ["approved", "start_time", "end_time", "type", "notes"];
  columsPendiente = ["approved", "start_time", "end_time", "type", "notes", "delete"];
  ausencias = [];
  ausenciasPasadas = [];
  ausenciasDenegadas = [];
  ausenciasAprobadas = [];
  ausenciasPendientes = [];
  isMobile: boolean = false;

  constructor(private absencesService: AbsencesService, private _snackBar: MatSnackBar, private mainComponent: MainComponent, private breakpointObserver: BreakpointObserver, private translate: TranslateService, public dialog: MatDialog) { 
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });

   }


  ngOnInit(): void {
    this.getAbsences();
    
  }

  getAbsences(){
    this.loading2 = true;
    this.absencesService.getAbsences().subscribe(resultado =>{
      if(resultado.success){
        this.ausencias = resultado.data;
        // console.log(resultado);
        if(resultado.data.length > 0) this.ordenarAusencias();
      }else{
        this.dialog.open(AlertComponent, {
          height: '200px',
          width: '400px',
          data: {btn: 1, msg: this.translate.instant('ABSENCES.label_error'), title: this.translate.instant('ALERT.label_error').toUpperCase()}
        });
      }
      this.loading2 = false;
      this.loading = false;
    });
  }

  ordenarAusencias(){
    let fechaActual = new Date();

    this.ausenciasDenegadas = this.ausencias.filter(ausencia => ausencia['approved'] === 0);
    this.ausenciasPendientes = this.ausencias.filter(ausencia => ausencia['approved'] === null);
    this.ausenciasPasadas = this.ausencias.filter(ausencia => {
        let fechaFin = new Date(ausencia['end_time']);
        return fechaFin < fechaActual;
    });
    this.ausenciasAprobadas = this.ausencias.filter(ausencia => {
        let fechaFin = new Date(ausencia['end_time']);
        return fechaFin >= fechaActual && ausencia['approved'] === 1;
    });

    // console.log("Ausencias (todas/pasadas/denegadas/Aprobadas/pendientes): ");
    // console.log(this.ausencias);
    // console.log(this.ausenciasPasadas);
    // console.log(this.ausenciasDenegadas);
    // console.log(this.ausenciasAprobadas);
    // console.log(this.ausenciasPendientes)

  }

  eliminar(id: number){
    let dialogRef = this.dialog.open(AlertComponent, {
      height: '200px',
      width: '400px',
      data: {btn: 2, msg: this.translate.instant('ABSENCES.label_delete'), title: this.translate.instant('ALERT.label_warning').toUpperCase()}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "Ok"){
        this.absencesService.deleteAbsences(id).subscribe(resultado =>{
          if(resultado.success){
            this.getAbsences();
            this.mainComponent.getAbsenceBadge();

            this._snackBar.open(this.translate.instant('ABSENCES.successfully_deleted_snack'), this.translate.instant('CONFIG.accept_snack'), {
              duration: 3 * 1000, // 3 Segundos
            });
          }else{
            this.dialog.open(AlertComponent, {
              height: '200px',
              width: '400px',
              data: {btn: 1, msg: this.translate.instant('ABSENCES.label_error_delete'), title: this.translate.instant('ALERT.label_error').toUpperCase()}
            });
          }
        });
      }
     });
  }

  addAbsence(){
    let dialogRef = this.dialog.open(AddabsenceComponent, {
      height: this.isMobile ? '60%' : '360px',
      width: this.isMobile ? '95%' : '540px',
    });

    dialogRef.afterClosed().subscribe(result => {
        this.getAbsences();
        this.mainComponent.getAbsenceBadge();
    });
  }
  
}
