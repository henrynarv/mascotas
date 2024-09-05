import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from '../models/mascota.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8080/api/mascotas';

  constructor(private http: HttpClient) { }
  ngOnInit(): void {


  }

  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.apiUrl)
  }

}
