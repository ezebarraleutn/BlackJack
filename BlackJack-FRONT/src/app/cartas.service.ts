import { Injectable } from '@angular/core';
import { Resultado } from './interfaces/resultado';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GanadoPerdido } from './interfaces/ganadoPerdido';
import { CantidadXHora } from './interfaces/cantidadXHora';
import { CantidadXFecha } from './interfaces/cantidadXFecha';
import { CrupierXJugador } from './interfaces/crupierXJugador';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  inicio(username: string): Observable<Resultado> {
    return this.http.get<Resultado>(this.url+"inicio/"+username)
  }

  pedir(id: number, username: string, player: boolean): Observable<Resultado> {
    return this.http.get<Resultado>(this.url+"pedir/"+id+"/"+username+"/"+player)
  }

  ultima(username: string): Observable<Resultado>{
    return this.http.get<Resultado>(this.url+"ultima/"+username)
  }

  esFinalizada(username: string): Observable<Resultado>{
    return this.http.get<Resultado>(this.url+"esFinalizada/"+username)
  }

  esGanador(id: number, ganador: number): Observable<Resultado>{
    return this.http.get<Resultado>(this.url+"setGanador/"+id+"/"+ganador)
  }

  pieGP(username: string): Observable<GanadoPerdido>{
    return this.http.get<GanadoPerdido>(this.url+"pieGP/"+username)
  }

  lineCXH(username: string): Observable<CantidadXHora[]>{
    return this.http.get<CantidadXHora[]>(this.url+"lineCXH/"+username)
  }

  indiceVictoria(): Observable<GanadoPerdido>{
    return this.http.get<GanadoPerdido>(this.url+"indiceVictoriasCrupier")
  }

  lineCJXDC(sumarRestarDia: number): Observable<CantidadXFecha>{
    return this.http.get<CantidadXFecha>(this.url+"lineCJXDC/"+sumarRestarDia)
  }

  lineCPXDC(sumarRestarDia: number): Observable<CantidadXFecha>{
    return this.http.get<CantidadXFecha>(this.url+"lineCPXDC/"+sumarRestarDia)
  }

  promedioCrupier(): Observable<number>{
    return this.http.get<number>(this.url+"promedioCrupier")
  }

  promedioJugadores(): Observable<number>{
    return this.http.get<number>(this.url+"promedioJugadores")
  }

}