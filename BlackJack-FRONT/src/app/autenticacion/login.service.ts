import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  autenticar(nombre: String, password: String): Observable<any> {
    return this.http.post<any>(this.url + 'authenticate', {
      "username": nombre,
      "password": password
    })
  }

  public loginUser(token: any){
    localStorage.setItem('token', token);
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout;
    }
  }

  public getCurrentUser(): Observable<any>{
    return this.http.get<any>(this.url + 'actual');
  }
  
}
