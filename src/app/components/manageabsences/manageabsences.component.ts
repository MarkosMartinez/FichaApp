import { Component } from '@angular/core';

import { AbsencesService } from '../../services/absences.service';
import { UsersService } from '../../services/users.service';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AlertComponent } from '../alert/alert.component';
import { MainComponent } from '../main/main.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Usuario {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface Ausencia {
  id: number;
  userid: string
  approved: string;
  notes: string;
  type: string;
  start_time: Date;
  end_time: Date;
}

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
  colums = ["user", "approved", "start_time", "end_time", "type", "notes"];
  columsPendiente = ["user", "approved", "start_time", "end_time", "type", "notes", "approve", "reject"];
  isMobile: boolean = false;

  constructor(private absencesService: AbsencesService, private usersService: UsersService, private mainCmponent: MainComponent, private _snackBar: MatSnackBar, private translate: TranslateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPendingAbsences();
    
  }

  getPendingAbsences(){
    this.loading2 = true;
    this.absencesService.getPendingAbsences().subscribe(resultado =>{
      if(resultado.success){
        this.ausencias = resultado.data;
        // console.log(resultado);
        this.obtenerUsuarios();
      }else{
        this.dialog.open(AlertComponent, {
          height: '200px',
          width: '400px',
          data: {btn: 1, msg: this.translate.instant('MANAGE_ABSENCES.label_get_pending_error'), title: this.translate.instant('ALERT.label_error').toUpperCase()}
        });
        this.loading2 = false;
      }
      this.loading = false;
    });
  }

  aprovarAusencia(id: number, approved: boolean){
    let msg: any;
    this.absencesService.approveAbsences(id, approved).subscribe(resultado =>{
      if(resultado.success){
        this.ausencias = resultado.data;
        // console.log(resultado);
        if(resultado.success){
            msg = approved ? 'MANAGE_ABSENCES.successfully_aproved' : 'MANAGE_ABSENCES.successfully_rejected';
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
      this.mainCmponent.getAbsenceBadge();
    });
  }

  obtenerUsuarios(){
    this.usersService.loadUsers().subscribe(resultado =>{
      if(resultado.success){
        this.ausencias.forEach((ausencia: Ausencia) => {
          
          resultado.users.forEach((usuario: Usuario) => {
            if(ausencia.userid == usuario.id)
              ausencia.userid = usuario.name;
            
          });

        });
      }
      this.loading2 = false;
    });
  }

}
