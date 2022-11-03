import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartasService } from 'src/app/cartas.service';
import { Subscription } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { Player } from 'src/app/interfaces/player';
import { LoginService } from 'src/app/autenticacion/login.service';

@Component({
  selector: 'app-indice-victorias',
  templateUrl: './indice-victorias.component.html',
  styleUrls: ['./indice-victorias.component.css']
})
export class IndiceVictoriasComponent implements OnInit, OnDestroy {

  player: Player = {} as Player

  subscription: Subscription = new Subscription();

  constructor(private srv: CartasService, private srvLogin: LoginService) {
  }

  ngOnInit(): void {

    this.player.nombre = this.srvLogin.getUser().username;

    this.srv.indiceVictoria().subscribe({
      next: (r) => {
        this.datos = {
          labels: ['GANADAS', 'PERDIDAS', 'EMPATADAS'],
          datasets: [
            { data: [r.ganado, r.perdido, r.empatado] }
          ]
        }
      }
    })
    
  }

  datos: ChartData<'pie'> = {
    labels: ['GANADAS', 'PERDIDAS', 'EMPATADAS'],
    datasets: [
      { data: [0, 0, 0] }
    ]
  }

  opciones: ChartOptions = {
    responsive: true,
    plugins: {
      title: { text: "Índice de victorias por parte del croupier(%)", display: true, font: { size: 26 }, color: 'white', fullSize: true }
    }
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
