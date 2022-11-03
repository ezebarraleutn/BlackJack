import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartasService } from 'src/app/cartas.service';
import { Subscription } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { Player } from 'src/app/interfaces/player';
import { LoginService } from 'src/app/autenticacion/login.service';


@Component({
  selector: 'app-pie-gp',
  templateUrl: './pie-gp.component.html',
  styleUrls: ['./pie-gp.component.css']
})
export class PieGPComponent implements OnInit, OnDestroy {

  player: Player = {} as Player

  subscription: Subscription = new Subscription();

  constructor(private srv: CartasService, private srvLogin: LoginService) {
  }

  ngOnInit(): void {
    this.player.nombre = this.srvLogin.getUser().username;

    this.subscription.add(this.srv.pieGP(this.player.nombre).subscribe({
      next: (r) => {
        this.datos = {
          labels: ['GANADAS', 'PERDIDAS', 'EMPATADAS'],
          datasets: [
            { data: [r.ganado, r.perdido, r.empatado] }
          ]
        }
      }
    }))
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
      title: { text: "Partidas ganadas y perdidas", display: true, font: { size: 26 }, color: 'white', fullSize: true }
    }
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
