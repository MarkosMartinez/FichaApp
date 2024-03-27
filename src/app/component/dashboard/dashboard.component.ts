import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService){}

  ngOnInit(): void {
    this.authService.checkValidToken().subscribe(resultado =>{
      if(!resultado){
        this.cookieService.delete('token');
        this.cookieService.delete('nombre');
        this.router.navigate(['login']);
      }
    });
  }

}
