import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
import { MainComponent } from '../main/main.component';
import { TranslateService } from "@ngx-translate/core";

interface Usuario {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent {

  usuarios: any = [];
  columnas = ["id", "name", "email", "role"];

  constructor(private usersService: UsersService, private mainComponent: MainComponent, private translate: TranslateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();

  }

  loadUsers(){
    this.usersService.loadUsers().subscribe(resultado =>{
      if(resultado.success){
        this.usuarios = []
        resultado.users.forEach((usuario: Usuario) => {
          usuario.role = this.translate.instant('USER_ROLE.' + usuario.role);
          this.usuarios.push(usuario);
        });
      }else{
        if(resultado.error == "Unauthorised"){
          this.mainComponent.cerrarSesion();
        }
      }
    });
  }

  addUser(){
    let dialogRef = this.dialog.open(AdduserComponent, {
      height: '400px',
      width: '540px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      //if(result == "Success")
        this.loadUsers();
    });
  }
}
