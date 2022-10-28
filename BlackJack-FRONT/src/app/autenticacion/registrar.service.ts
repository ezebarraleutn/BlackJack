import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor(private http: HttpClient) { }

  registrar(nombre: String, password: String){
    
  }
  
}
