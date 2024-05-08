import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiDomain } from '../../environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAbsences() {
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>(`${apiDomain}/api/get-absences`, { headers }).pipe(
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

  deleteAbsences(id: number) {
    let token = this.cookieService.get('token');
    if (token) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post<any>(`${apiDomain}/api/delete-absence`, {"absenceid": id}, { headers }).pipe(
        map(response => {
          // console.log('Respuesta de la API:', response);
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
