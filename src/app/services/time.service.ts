import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { apiDomain } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  errorTime: Date = new Date(0);
  constructor(private http: HttpClient) { }

  getTime(): Observable<Date> {
    return this.http.get<any>(`${apiDomain}/api/get-time`).pipe(
      map(response => {
        // console.log('Respuesta de la API:', response);
        if(response.success)
          return new Date(response["serverTime"]);
        else
          throw new Error('Error en la respuesta de la API');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => new Date(this.errorTime));
      })
    );
  }
}
