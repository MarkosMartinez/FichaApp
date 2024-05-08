import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule, MatIconButton, MatButton } from '@angular/material/button';
import { UsersService } from '../../services/users.service';
import { AlertComponent } from '../alert/alert.component';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';


@Component({
    selector: 'app-adduser',
    templateUrl: './adduser.component.html',
    styleUrls: ['./adduser.component.css'],
    standalone: true,
    imports: [FormsModule, MatFormField, MatLabel, MatInput, ReactiveFormsModule, MatError, MatIcon, MatSuffix, MatIconButton, MatSelect, MatOption, MatButton, TranslateModule]
})
export class AdduserComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  role = new FormControl('', [Validators.required]);
  errorMessages = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: ''
  };
  valido = {
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    role: false
  };

  constructor(private usersService: UsersService, public dialog: MatDialog, private translate: TranslateService, public dialogRef: MatDialogRef<AdduserComponent>,) {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges,
      this.confirmPassword.statusChanges,
      this.confirmPassword.valueChanges,
      this.name.statusChanges,
      this.name.valueChanges,
      this.role.statusChanges,
      this.role.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => [this.updateErrorMessages(), this.checkValid()]);
  }

  hide: boolean = true;
  btnAdd: boolean = false;

  updateErrorMessages() {
    
    this.errorMessages.email = this.email.hasError('required') ? this.translate.instant('ADD_USER.error_required_email') :
      this.email.hasError('email') ? this.translate.instant('ADD_USER.error_invalid_email') : '';
  
    this.errorMessages.password = this.password.hasError('required') ? this.translate.instant('ADD_USER.error_required_password') :
      this.password.hasError('minlength') ? this.translate.instant('ADD_USER.error_invalid_password') : '';
  
    this.errorMessages.confirmPassword = this.confirmPassword.hasError('required') ? this.translate.instant('ADD_USER.error_required_confirm_password') :
      this.confirmPassword.hasError('minlength') ? this.translate.instant('ADD_USER.error_invalid_confirm_password') :
      this.confirmPassword.value !== this.password.value ? this.translate.instant('ADD_USER.error_different_password') : '';
  
    this.errorMessages.name = this.name.hasError('required') ? this.translate.instant('ADD_USER.error_required_name') :
      this.name.hasError('minlength') ? this.translate.instant('ADD_USER.error_invalid_name') : '';
      
    this.errorMessages.role = this.role.hasError('required') ? this.translate.instant('ADD_USER.error_required_rol') : '';
  }

  checkValid(){
    this.valido.email = !this.email.hasError('required') && !this.email.hasError("email");
    this.valido.password = !this.password.hasError('required') && !this.password.hasError("minlength");
    this.valido.confirmPassword = !this.confirmPassword.hasError('required') && !this.confirmPassword.hasError("minlength") && this.password.value == this.confirmPassword.value;
    this.valido.name = !this.name.hasError('required') && !this.name.hasError("minlength");
    this.valido.role = !this.role.hasError('required');
    if(this.valido.email && this.valido.password && this.valido.confirmPassword && this.valido.name && this.valido.role){
      this.btnAdd = true;
    }else{
      this.btnAdd = false;
    }
  }

  addUser(){
    this.btnAdd = false;
    this.usersService.addUser(this.name.value || '', this.email.value || '', this.password.value || '', this.confirmPassword.value || '', this.role.value || '').subscribe(resultado =>{
      if(resultado){
        this.dialogRef.close("Success");
      }else{
        this.dialog.open(AlertComponent, {
          height: '250px',
          width: '400px',
          data: {btn: 1, msg: this.translate.instant('ADD_USER.error_msg')}
        });
        this.btnAdd = true;
      }
    });
  }

}