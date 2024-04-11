import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
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

  constructor(private usersService: UsersService, private translate: TranslateService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();

  }

  loadUsers(){
    this.usersService.loadUsers().subscribe(resultado =>{
      this.usuarios = []
      resultado.users.forEach((usuario: Usuario) => {
        usuario.role = this.translate.instant('USER_ROLE.' + usuario.role);
        this.usuarios.push(usuario);
      });
    });
  }

  addUser(){
    let dialogRef = this.dialog.open(AdduserComponent, {
      height: '400px',
      width: '540px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if(result == "Success")
        this.loadUsers();
    });
  }
}
