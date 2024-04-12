import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { apiDomain } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getConfig(): Observable<Object> { //TODO Por hacer
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>(`${apiDomain}/api/get-config`, { headers }).pipe(
        map(response => {
          // console.log('Respuesta de la API:', response);
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
