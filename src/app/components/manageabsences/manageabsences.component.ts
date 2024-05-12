import { Component } from '@angular/core';

import { AbsencesService } from '../../services/absences.service';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manageabsences',
  standalone: true,
  imports: [CommonModule, MatProgressSpinner, MatProgressBar, MatFabButton, MatTableModule, MatIcon, TranslateModule, MatTabsModule],
  templateUrl: './manageabsences.component.html',
  styleUrl: './manageabsences.component.css'
})
export class ManageabsencesComponent {

  ausencias = [];
  loading = true;
  loading2 = true;
  colums = ["approved", "start_time", "end_time", "type", "notes"];
  columsPendiente = ["approved", "start_time", "end_time", "type", "notes", "approve", "reject"];
  isMobile: boolean = false;

  constructor(private absencesService: AbsencesService, private _snackBar: MatSnackBar, private translate: TranslateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPendingAbsences();
    
  }

  getPendingAbsences(){
    this.loading2 = true;
    this.absencesService.getPendingAbsences().subscribe(resultado =>{
      if(resultado.success){
        this.ausencias = resultado.data;
        console.log(resultado);
      }else{
        //TODO Mostrar mensaje de error
      }
      this.loading2 = false;
      this.loading = false;
    });
  }

  aprovarAusencia(id: number, approved: boolean){
    let msg: any;
    this.absencesService.approveAbsences(id, approved).subscribe(resultado =>{
      if(resultado.success){
        this.ausencias = resultado.data;
        console.log(resultado);
        if(resultado.success){
            msg = approved ? 'MANAGE_ABSENCES.successfully_aproved' : 'MANAGE_ABSENCES.successfully_rejected'; //TODO Traducir
          this._snackBar.open(this.translate.instant(msg), this.translate.instant('CONFIG.accept_snack'), {
            duration: 3 * 1000, // 3 Segundos
          });
        }else{
          this.dialog.open(AlertComponent, {
            height: '200px',
            width: '400px',
            data: {btn: 1, msg: this.translate.instant('MANAGE_ABSENCES.label_error'), title: this.translate.instant('ALERT.label_error').toUpperCase()}
          });
        }
      }else{
        this.dialog.open(AlertComponent, {
          height: '200px',
          width: '400px',
          data: {btn: 1, msg: this.translate.instant('MANAGE_ABSENCES.label_error'), title: this.translate.instant('ALERT.label_error').toUpperCase()}
        });
      }
      this.getPendingAbsences();
    });
  }

}
