import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { apiDomain } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  getConfig(): Observable<any> {
    return this.http.get<any>(`${apiDomain}/api/get-config`).pipe(
      map(response => {
        // console.log('Respuesta de la API:', response);
        if (response.success) {
          return response.config;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return of(false);
      })
    );
  }
}
