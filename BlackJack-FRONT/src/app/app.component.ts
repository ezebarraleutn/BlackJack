import { Component } from '@angular/core';
import { LoginService } from './autenticacion/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'BlackJack';

  constructor(private router: Router, private srv: LoginService){
  }

  salir(){
    this.srv.logout();
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=> this.router.navigate(["/"]));
  }

}
