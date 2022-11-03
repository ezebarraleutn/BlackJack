import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  url: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  registrar(nombre: String, password: String): Observable<any> {
    return this.http.post<any>(this.url + 'register', {
      "username": nombre,
      "password": password
    })
  }

}
