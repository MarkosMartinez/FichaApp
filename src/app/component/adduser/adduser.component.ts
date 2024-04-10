import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';


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

  constructor() {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges,
      this.confirmPassword.statusChanges,
      this.confirmPassword.valueChanges,
      this.name.statusChanges,
      this.name.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessages());
  }

  hide = true;
  btnAdd: boolean = true;

  updateErrorMessages() {
    this.errorMessages.email = this.email.hasError('required') ? 'Tienes que escribir un email' :
      this.email.hasError('email') ? 'No es un email valido' : '';
  
    this.errorMessages.password = this.password.hasError('required') ? 'Tienes que escribir una contraseña' :
      this.password.hasError('minlength') ? 'La contraseña debe tener al menos 4 caracteres' : '';
  
    this.errorMessages.confirmPassword = this.confirmPassword.hasError('required') ? 'Tienes que confirmar la contraseña' :
      this.confirmPassword.hasError('minlength') ? 'La confirmación de la contraseña debe tener al menos 4 caracteres' :
      this.confirmPassword.value !== this.password.value ? 'La confirmación de la contraseña no coincide' : '';
  
    this.errorMessages.name = this.name.hasError('required') ? 'Tienes que escribir un nombre' :
      this.name.hasError('minlength') ? 'El nombre debe tener al menos 4 caracteres' : '';
      
    this.errorMessages.role = this.name.hasError('required') ? 'Tienes que seleccionar un rol' : '';
  }

  addUser(){
    this.btnAdd = false;
    console.log("Añadir usuario pulsado!");
  }
}