import { Injectable } from '@angular/core';
import { Resultado } from './interfaces/resultado';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  inicio(): Observable<Resultado> {
    return this.http.get<Resultado>(this.url+"inicio")
  }

  pedir(id: boolean): Observable<Resultado> {
    return this.http.get<Resultado>(this.url+"pedir/"+id)
  }

  pedirCrupier(): Observable<Resultado> {
    return this.http.get<Resultado>(this.url+"pedirCrupier")
  }

  obtenerCartas(): Observable<Resultado> {
    return this.http.get<Resultado>(this.url+"obtenerCartas")
  }

}