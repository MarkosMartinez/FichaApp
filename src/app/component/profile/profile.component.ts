import { Component, Inject, Optional } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    standalone: true,
    imports: [MatProgressBar, MatProgressSpinner, FormsModule, MatFormField, MatLabel, MatInput, MatSuffix, MatButton, TranslateModule, MatIcon]
})
export class ProfileComponent {
  loading: boolean = true;
  id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  new_password: string = '';
  c_new_password: string = '';
  role: string = '';
  //created_at: Date = new Date();
  //updated_at: Date = new Date();

  btnUpdate: boolean = true;
  hide: boolean = true;

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<ProfileComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private cookieService: CookieService, private translate: TranslateService, private _snackBar: MatSnackBar, private profileService: ProfileService) { 
    this.id = data ? data.id : '';
   }

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil(){
    this.profileService.getProfile(this.id).subscribe(resultado =>{
      if(resultado){
        //console.log(resultado.data);
        // this.id = resultado.data.id;
        this.name = resultado.data.name;
        this.email = resultado.data.email;
        this.role = resultado.data.role;
        this.loading = false;
      }else{
        //TODO Mostrar mensaje de error?
        this.loading = false;
      }
    });
  }

  actualizarPerfil(){
    if(this.id != ''){
      this.profileService.editOtherProfile(Number(this.id), this.name, this.email, this.role, this.new_password, this.c_new_password).subscribe(resultado =>{
        if(resultado){
          this.password = '';
          this.new_password = '';
          this.c_new_password = '';
          this.cookieService.set('name', this.name);
          this.cerrarVentana();
          let message = this.translate.instant('PROFILE.updated_successfully_snack');
          this._snackBar.open(message, this.translate.instant('PROFILE.accept_snack'), {
            duration: 3 * 1000, // 3 Segundos
          });
        }else{
          console.log("Error");
          //TODO Mostrar mensaje de error?
        }
      });
    }else{
      this.profileService.editProfile(this.name, this.email, this.password, this.new_password, this.c_new_password).subscribe(resultado =>{
        if(resultado){
          this.password = '';
          this.new_password = '';
          this.c_new_password = '';
          this.cookieService.set('name', this.name);
          let message = this.translate.instant('PROFILE.updated_successfully_snack');
          this._snackBar.open(message, this.translate.instant('PROFILE.accept_snack'), {
            duration: 3 * 1000, // 3 Segundos
          });
        }else{
          console.log("Error");
          //TODO Mostrar mensaje de error?
        }
      });
    }
  }

  cerrarVentana(){
    this.id = '';
    this.name = '';
    this.email = '';
    this.password = '';
    this.new_password = '';
    this.c_new_password = '';
    this.role = '';
    
    this.dialogRef.close();
  }

}
