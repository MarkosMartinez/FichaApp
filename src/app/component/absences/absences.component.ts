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
import { AlertComponent } from '../alert/alert.component';


@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.css',
  standalone: true,
  imports: [CommonModule, MatProgressSpinner, MatProgressBar, MatFabButton, MatTableModule, MatIcon, TranslateModule, MatTabsModule]
})

export class AbsencesComponent {
  loading = true;
  loading2 = true;;
  colums = ["approved", "start_time", "end_time", "type", "notes"];
  columsPendiente = ["approved", "start_time", "end_time", "type", "notes", "delete"];
  ausencias = [];
  ausenciasPasadas = [];
  ausenciasDenegadas = [];
  ausenciasAprobadas = [];
  ausenciasPendientes = [];
  constructor(private absencesService: AbsencesService, private translate: TranslateService, public dialog: MatDialog) {}


  ngOnInit(): void {
    this.getAbsences();
    
  }

  getAbsences(){
    this.loading2 = true;
    this.absencesService.getAbsences().subscribe(resultado =>{
      if(resultado.success){
        this.ausencias = resultado.data;
        // console.log(resultado);
        this.ordenarAusencias();
      }else{
        //TODO Mostrar mensaje de error
      }
      this.loading2 = false;
      this.loading = false;
    });
  }

  ordenarAusencias(){
    let fechaActual = new Date();

    this.ausenciasDenegadas = this.ausencias.filter(ausencia => ausencia['approved'] === false);
    this.ausenciasPendientes = this.ausencias.filter(ausencia => ausencia['approved'] === null);
    this.ausenciasPasadas = this.ausencias.filter(ausencia => {
        let fechaFin = new Date(ausencia['end_time']);
        return fechaFin < fechaActual;
    });
    this.ausenciasAprobadas = this.ausencias.filter(ausencia => {
        let fechaFin = new Date(ausencia['end_time']);
        return fechaFin >= fechaActual && ausencia['approved'] === true;
    });

    // console.log("Ausencias (todas/pasadas/denegadas/Aprobadas/pendientes): ");
    // console.log(this.ausencias);
    // console.log(this.ausenciasPasadas);
    // console.log(this.ausenciasDenegadas);
    // console.log(this.ausenciasAprobadas);
    // console.log(this.ausenciasPendientes)

  }

  eliminar(id: number){
    console.log("Se va a eliminar la ausencia con el id: " + id);
    //TODO alert de confirmación
    let dialogRef = this.dialog.open(AlertComponent, {
      height: '200px',
      width: '400px',
      data: {btn: 2, msg: this.translate.instant('ABSENCES.label_delete'), title: this.translate.instant('ALERT.label_warning').toUpperCase()}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "Ok"){
        this.absencesService.deleteAbsences(id).subscribe(resultado =>{
          if(resultado.success)
            this.getAbsences();
          else{
            let dialogRef = this.dialog.open(AlertComponent, {
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
  }
}
