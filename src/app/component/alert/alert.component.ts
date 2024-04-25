import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from "@ngx-translate/core";
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
    standalone: true,
    imports: [MatButton]
})
export class AlertComponent {
  btn: number = 1;
  msg: string = "" //TODO MSG Default?
  btnOk = "Ok";
  btnCancel = "Cancelar";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private translate: TranslateService, public dialogRef: MatDialogRef<AlertComponent>) { 
    this.btn = data.btn;
    this.msg = data.msg;

   }

   ngOnInit(): void {
    this.btnOk = this.translate.instant('ALERT.btn_ok');
    this.btnCancel = this.translate.instant('ALERT.btn_cancel');
   };

   ok(){
    console.log("OK pulsado");
    if(this.btn == 1)
      this.dialogRef.close("Ok");
    else
      this.dialogRef.close("Ok");
   }

   cancel(){
    this.dialogRef.close("Cancel");
   }

}
