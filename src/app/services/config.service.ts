import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { apiDomain } from '../../environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getConfig(): Observable<any> {
    return this.http.get<any>(`${apiDomain}/api/get-config`).pipe(
      map(response => {
        // console.log('Respuesta de la API:', response);
        if(response.success)
          return response;
        else
          return false;
      }),
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return of(false);
      })
    );
  }

  updateConfig(language: string, app_name: string): Observable<boolean> {
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post<any>(`${apiDomain}/api/set-config`, { "language": language, "app_name": app_name }, { headers }).pipe(
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

  resetDb() {
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>(`${apiDomain}/api/reset-db`, { headers }).pipe(
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

}
