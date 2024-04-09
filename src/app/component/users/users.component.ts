import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  usuarios = [];
  columnas = ["id", "name", "email", "rol"]

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();

  }

  loadUsers(){
    this.usersService.loadUsers().subscribe(resultado =>{
      //console.log(resultado);
      this.usuarios = resultado.users;
    });
  }
}
