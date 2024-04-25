import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
import { MainComponent } from '../main/main.component';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TitleCasePipe } from '@angular/common';

interface Usuario {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    standalone: true,
    imports: [MatProgressBar, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatFabButton, MatIcon, TitleCasePipe, TranslateModule]
})

export class UsersComponent {

  users: any = [];
  colums = ["id", "name", "email", "role"];
  loading: boolean = true;

  constructor(private usersService: UsersService, private mainComponent: MainComponent, private translate: TranslateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();

  }

  loadUsers(){
    this.usersService.loadUsers().subscribe(resultado =>{
      if(resultado.success){
        this.users = []
        resultado.users.forEach((usuario: Usuario) => {
          usuario.role = this.translate.instant('USER_ROLE.' + usuario.role);
          this.users.push(usuario);
        });
        this.loading = false;
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

  refresh(){
    this.loading = true;
    this.loadUsers();
  }
}
