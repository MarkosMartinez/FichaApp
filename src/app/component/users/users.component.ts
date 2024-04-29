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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  isMobile: boolean = false;

  constructor(private usersService: UsersService, private breakpointObserver: BreakpointObserver, private mainComponent: MainComponent, private translate: TranslateService, public dialog: MatDialog) { 
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
   }

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
    // TODO Mejorar la vista en móviles
    let dialogRef = this.dialog.open(AdduserComponent, {
      height: this.isMobile ? '90%' : '400px',
      width: this.isMobile ? '95%' : '540px',
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
