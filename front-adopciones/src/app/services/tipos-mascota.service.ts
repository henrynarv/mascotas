import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TipoMascotaModel } from '../models/tipo-mascota.model';

@Injectable({
  providedIn: 'root'
})
export class TiposMascotaService {

  private apiUrl = 'http://localhost:8080/api/tipos-mascota';

  constructor(private http: HttpClient) { }

  getTiposDeMascota(): Observable<TipoMascotaModel[]> {
    return this.http.get<TipoMascotaModel[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    )
  }


  createTipoMascota(tipoMascota: TipoMascotaModel): Observable<TipoMascotaModel> {
    return this.http.post<TipoMascotaModel>(`${this.apiUrl}`, tipoMascota).pipe(
      catchError(this.handleError)
    )
  }

  updateTipoMAscota(id: number, tipoMascota: TipoMascotaModel): Observable<TipoMascotaModel> {
    return this.http.put<TipoMascotaModel>(`${this.apiUrl}/${id}`, tipoMascota).pipe(
      catchError(this.handleError)
    )
  }

  deleteTipoMascota(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }


  getTipoMascotaById(id: number): Observable<TipoMascotaModel> {
    return this.http.get<TipoMascotaModel>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "ocurrio un error desconocido.";

    if (error.error instanceof ErrorEvent) {
      // Error del cliente o red
      errorMessage = `Error: ${error.error.message}`
    } else {
      // Error del servidor

      errorMessage = `código de estado: ${error.status}\nMensaje: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));

  }

}
