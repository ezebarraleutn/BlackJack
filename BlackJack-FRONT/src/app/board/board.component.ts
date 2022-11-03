import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Resultado } from '../interfaces/resultado';

import { Subscription } from 'rxjs';
import { Player } from '../interfaces/player';
import { LoginService } from '../autenticacion/login.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription();

  player: Player = {} as Player;

  @Input() resultado: Resultado = {} as Resultado;

  constructor(private srv: LoginService) {

  }

  ngOnInit(): void {

    this.player.nombre = this.srv.getUser().username;
    
  }

  ngOnDestroy():void{
    this.suscripcion.unsubscribe();
  }

}
