import { Component } from '@angular/core';

import { AbsencesService } from '../../services/absences.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService, TranslateModule } from "@ngx-translate/core"; //TODO Quitarlo?
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-addabsence',
  standalone: true,
  imports: [MatIcon, MatFabButton, MatTabsModule],
  templateUrl: './addabsence.component.html',
  styleUrl: './addabsence.component.css'
})
export class AddabsenceComponent {

  constructor(private absencesService: AbsencesService, private translate: TranslateService, public dialog: MatDialog) { }
  //TODO Usar Stepper, Datepicker...

  ngOnInit(): void {
    
  }


}
