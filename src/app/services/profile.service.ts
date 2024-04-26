import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { apiDomain } from '../../environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getProfile(id = null){
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      let url = `${apiDomain}/api/get-profile${id ? `?id=${id}` : ''}`;
      return this.http.get<any>(url, { headers }).pipe(
        map(response => {
          //console.log('Respuesta de la API:', response);
          return response;
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
  editProfile(name: string, email: string, password: string, new_password: string, c_new_password: string): Observable<boolean> {
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      let datos = {};
      if(new_password == "" || !new_password)
        datos = {name: name, email: email, password: password};
      else
        datos = {name: name, email: email, password: password, new_password: new_password, c_new_password: c_new_password};

      return this.http.post<any>(`${apiDomain}/api/edit-profile`, datos, { headers }).pipe(
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
