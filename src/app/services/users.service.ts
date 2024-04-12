import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiDomain } from '../../environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  loadUsers() {
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>(`${apiDomain}/api/users`, { headers }).pipe(
        map(response => {
          //console.log('Respuesta de la API:', response);
          return response;
        }),
      );
    } else {
      return of(false);
    }
  }

  addUser(name: string, email: string, password: string, confirmPassword: string, role: string): Observable<boolean> {
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post<any>(`${apiDomain}/api/add-user`, { "name": name, "email": email, "password": password, "c_password": confirmPassword, "role": role }, { headers }).pipe(
        map(response => {
          //console.log('Respuesta de la API:', response);
          if (response.success) {
            return true;
          } else {
            return false;
          }
        }),
        catchError(error => {
          console.error('Error en la solicitud:', error);
          return of(false);
        })
      );
  } else {
    return of(false);
  }
  }

}
