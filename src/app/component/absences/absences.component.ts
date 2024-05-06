import { Component } from '@angular/core';

import { AbsencesService } from '../../services/absences.service';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
import { MainComponent } from '../main/main.component';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.css'
})
export class AbsencesComponent {
  loading = true;
  ausencias = [];
  ausenciasPasadas = [];
  ausenciasDenegadas = [];
  ausenciasAprovadas = [];
  constructor(private absencesService: AbsencesService, private translate: TranslateService, public dialog: MatDialog) {}


  ngOnInit(): void {
    this.getAbsences();
    //this.ordenarAusencias(); //Hacer que espere a getAbsences?
    
  }

  getAbsences(){
    this.absencesService.getAbsences().subscribe(resultado =>{
      if(resultado.success){
        this.ausencias = resultado.data;
        //console.log("Resultado: " + resultado);
        this.loading = false;
      }else{
        //TODO Mostrar mensaje de error y poner loading a false?
      }
    });
  }

}
