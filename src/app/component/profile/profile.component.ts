import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    standalone: true,
    imports: [FormsModule, MatFormField, MatLabel, MatInput, MatSuffix, MatButton, TranslateModule, MatIcon]
})
export class ProfileComponent {
  id: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  new_password: string = "";
  c_new_password: string = "";
  role: string = "";
  //created_at: Date = new Date();
  //updated_at: Date = new Date();

  btnUpdate: boolean = true;
  hide: boolean = true;

  constructor(private authService: AuthService, private translate: TranslateService, private _snackBar: MatSnackBar, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil(){
    this.profileService.getProfile().subscribe(resultado =>{
      if(resultado){
        //console.log(resultado.data);
        this.id = resultado.data.id;
        this.name = resultado.data.name;
        this.email = resultado.data.email;
        this.role = resultado.data.role;
      }else{
        //TODO Mostrar mensaje de error?
      }
    });
  }

  actualizarPerfil(){
    this.profileService.editProfile(this.name, this.email, this.password, this.new_password, this.c_new_password).subscribe(resultado =>{
      if(resultado){
        this.password = '';
        this.new_password = '';
        this.c_new_password = '';
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
