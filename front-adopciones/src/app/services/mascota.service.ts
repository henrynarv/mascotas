import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { Mascota } from '../models/mascota.interface';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private apiUrl = 'http://localhost:8080/api/mascotas';

  constructor(private http: HttpClient) { }
  //LISTAR MASCOTAS
  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}`).pipe(
      map(responde => responde),
      catchError(this.handleError)
    );
  }

  //CREAR NUEVA MASCOTA
  createMascota(formData: FormData): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.apiUrl}`, formData).pipe(

      map(responde => responde),

      catchError(this.handleError)
    );
  }


  deleteMascotaId(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  getMascotaById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateMascota(id: number, formData: FormData): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    )
  }



  private handleError(error: HttpErrorResponse) {
    let errorMessage = "ocurrio un error desconocido";

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error : ${error.error.message}`;
    } else {
      errorMessage = `Código de estado: ${error.status}\nMensaje: ${error.message}`
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }



}
