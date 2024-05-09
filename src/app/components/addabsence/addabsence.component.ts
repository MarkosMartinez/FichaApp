import { Component } from '@angular/core';

import { AbsencesService } from '../../services/absences.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService, TranslateModule } from "@ngx-translate/core"; //TODO Quitarlo?
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-addabsence',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatDatepickerModule, MatSelectModule, ReactiveFormsModule, MatIcon,
    MatFabButton, MatTabsModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './addabsence.component.html',
  styleUrl: './addabsence.component.css'
})
export class AddabsenceComponent {

  tipos = [
    {value: 'holiday', viewValue: 'Vacaciones'},
    {value: 'medical', viewValue: 'Medica'},
    {value: 'other', viewValue: 'Otro'},
  ];

  start_time: Date | null = null; //TODO Minimo mañana
  end_time: Date | null = null;
  type: any = "";
  notes = "";
  minDate: Date = new Date();

  isManager: boolean = false;

  //TODO Traducir esto
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  filtroFechas = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Evitar que el sabado y domingo sean seleccionados
    return day !== 0 && day !== 6;
  };

  constructor(private absencesService: AbsencesService, private _formBuilder: FormBuilder, private translate: TranslateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  addAbsence(){
    if(this.validarDatos()){
      //TODO Cerrar
    }else{
      //TODO Mostrar mensaje error
    }
    console.log("Tipo: " + this.type);
    console.log("Fecha inicio: " + this.start_time);
    console.log("Fecha fin: " + this.end_time);
    console.log("Notas: " + this.notes);
  }

  validarDatos(): boolean{
    let valido = true;
    //TODO
    return valido;
  }

}
