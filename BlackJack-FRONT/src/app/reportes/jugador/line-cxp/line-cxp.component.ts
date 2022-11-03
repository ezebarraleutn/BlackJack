import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartasService } from 'src/app/cartas.service';
import { Subscription } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { Player } from 'src/app/interfaces/player';
import { LoginService } from 'src/app/autenticacion/login.service';

@Component({
  selector: 'app-line-cxp',
  templateUrl: './line-cxp.component.html',
  styleUrls: ['./line-cxp.component.css']
})
export class LineCxpComponent implements OnInit, OnDestroy {

  player: Player = {} as Player

  subscription: Subscription = new Subscription();

  constructor(private srv: CartasService, private srvLogin: LoginService) {
  }

  ngOnInit(): void {

    this.player.nombre = this.srvLogin.getUser().username;

    this.srv.lineCXH(this.player.nombre).subscribe({
      next: (r) => {
        let horas: number[] = []
        let cantidad: number[] = []

        if (r.length > 0) {

          if (r.length < 4) {

            let inicioH

            switch (r[0].hora) {
              case 0: inicioH = 21
                break;
              case 1: inicioH = 22
                break;
              case 2: inicioH = 23
                break;
              default: inicioH = r[0].hora - 3
                break;
            }

            for (let i = 0; i < 4; i++) {

              if (inicioH == 24) {
                inicioH = 0;
              }

              horas.push(inicioH)

              for (let j = 0; j < 4; j++) {

                try {
                  if (r[j].hora == inicioH) {
                    //console.log(r[j].hora, ' ', inicioH, ' ', r[j].cantidad)
                    cantidad.push(r[j].cantidad)
                    break
                  }

                } catch (error) {
                  cantidad.push(0)
                  break
                }
              }

              inicioH++
            }

          } else {
            r.forEach(e => {
              horas.push(e.hora)
              cantidad.push(e.cantidad)
            });
          }

        } else {
          horas = [0, 0, 0, 0]
          cantidad = [0, 0, 0, 0]
        }

        this.datos = {
          labels: horas,
          datasets: [
            { data: cantidad, label: this.player.nombre }
          ]
        }
      }
    })
  }

  datos: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data: [] }
    ]
  }

  opciones: ChartOptions = {
    responsive: true,
    plugins: {
      title: { text: "Progreso ganadas en las ultimas 4 horas de juego", display: true, font: { size: 26 }, color: 'white', fullSize: true }
    }
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
