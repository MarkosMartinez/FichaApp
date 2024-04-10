import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  usuarios = [];
  columnas = ["id", "name", "email", "rol"];

  constructor(private usersService: UsersService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();

  }

  loadUsers(){
    this.usersService.loadUsers().subscribe(resultado =>{
      //console.log(resultado);
      this.usuarios = resultado.users;
    });
  }

  addUser(){
    let dialogRef = this.dialog.open(AdduserComponent, {
      height: '400px',
      width: '540px',
    });
  }
}
