import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
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

  constructor(private usersService: UsersService, public dialogRef: MatDialogRef<AdduserComponent>,) {
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
    
    this.errorMessages.email = this.email.hasError('required') ? 'Tienes que escribir un email' :
      this.email.hasError('email') ? 'No es un email valido' : '';
  
    this.errorMessages.password = this.password.hasError('required') ? 'Tienes que escribir una contraseña' :
      this.password.hasError('minlength') ? 'La contraseña debe tener al menos 4 caracteres' : '';
  
    this.errorMessages.confirmPassword = this.confirmPassword.hasError('required') ? 'Tienes que confirmar la contraseña' :
      this.confirmPassword.hasError('minlength') ? 'La confirmación de la contraseña debe tener al menos 4 caracteres' :
      this.confirmPassword.value !== this.password.value ? 'La confirmación de la contraseña no coincide' : '';
  
    this.errorMessages.name = this.name.hasError('required') ? 'Tienes que escribir un nombre' :
      this.name.hasError('minlength') ? 'El nombre debe tener al menos 2 caracteres' : '';
      
    this.errorMessages.role = this.role.hasError('required') ? 'Tienes que seleccionar un rol' : '';
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
      if(resultado)
        this.dialogRef.close("Success");
      else
      //TODO Añadir mensaje de que algo no ha ido bien
      this.btnAdd = true;
    });
  }

}