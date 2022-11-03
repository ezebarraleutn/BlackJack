import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartasService } from 'src/app/cartas.service';
import { Subscription } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { Player } from 'src/app/interfaces/player';
import { LoginService } from 'src/app/autenticacion/login.service';

@Component({
  selector: 'app-promedio-jugadas',
  templateUrl: './promedio-jugadas.component.html',
  styleUrls: ['./promedio-jugadas.component.css']
})
export class PromedioJugadasComponent implements OnInit, OnDestroy {

  player: Player = {} as Player

  subscription: Subscription = new Subscription();

  constructor(private srv: CartasService, private srvLogin: LoginService) {
  }

  ngOnInit(): void {

    this.player.nombre = this.srvLogin.getUser().username;

    this.subscription.add(this.srv.promedioCrupier().subscribe({
      next: (r1) => {
        
        this.subscription.add(this.srv.promedioJugadores().subscribe({
          next: (r2)=>{

            this.datos = {
              labels: ['CRUPIER', 'JUGADORES'],
              datasets: [
                { data: [r1, r2] }
              ]
            }

          }
        }))

      }
    }))

    
    
  }

  datos: ChartData<'pie'> = {
    labels: ['CRUPIER', 'JUGADORES'],
    datasets: [
      { data: [0, 0] }
    ]
  }

  opciones: ChartOptions = {
    responsive: true,
    plugins: {
      title: { text: "Promedio de puntaje por partida", display: true, font: { size: 26 }, color: 'white', fullSize: true }
    }
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
