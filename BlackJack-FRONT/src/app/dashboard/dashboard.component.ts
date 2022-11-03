import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Player } from '../interfaces/player';
import { LoginService } from '../autenticacion/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private suscripcion = new Subscription();

  player: Player = {} as Player;

  constructor(
    private router: Router, 
    private srv: LoginService) {
  }

  ngOnInit(): void {

    this.player.nombre = this.srv.getUser().username;
    //console.log(this.player.nombre);

  }

  ngAfterViewChecked(): void{

  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

}
