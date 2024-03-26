import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  autenticado: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  isAuthenticated(){
    return this.autenticado;
  }

  iniciarSesion(correo: string, contraseña: string): Observable<boolean> {
    return this.http.post<any>('https://fichaapp-api.fly.dev/api/login', { "email": correo, "password": contraseña }).pipe(
      map(response => {
        console.log('Respuesta de la API:', response);
        if (response.success) {
          this.cookieService.set('token', response.data.token);
          this.cookieService.set('nombre', response.data.nombre);
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
