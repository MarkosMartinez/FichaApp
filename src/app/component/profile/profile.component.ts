import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    standalone: true,
    imports: [FormsModule, MatFormField, MatLabel, MatInput, MatButton, TranslateModule]
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
  profileForm: any;

  btnUpdate: boolean = true;

  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.obtenerPerfil();
  }

  obtenerPerfil(){
    this.profileService.getProfile().subscribe(resultado =>{
      if(resultado){
        console.log(resultado.data);
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
    
  }

}
