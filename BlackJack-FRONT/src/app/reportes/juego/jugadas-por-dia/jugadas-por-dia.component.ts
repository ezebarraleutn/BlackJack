import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartasService } from 'src/app/cartas.service';
import { Subscription } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { LoginService } from 'src/app/autenticacion/login.service';

@Component({
  selector: 'app-jugadas-por-dia',
  templateUrl: './jugadas-por-dia.component.html',
  styleUrls: ['./jugadas-por-dia.component.css']
})
export class JugadasPorDiaComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  dia: number = 0

  siguiente: boolean = false

  constructor(private srv: CartasService, private srvLogin: LoginService) {
  }

  ngOnInit(): void {

    this.cantidadXDia()

  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  restar() {
    this.dia++
    this.habilitarSiguiente()
    setTimeout(() => {
      this.cantidadXDia()
    }, 200)
  }

  sumar() {
    if (this.dia > 0) {
      this.dia--
      this.habilitarSiguiente()
      setTimeout(() => {
        this.cantidadXDia()
      }, 200)
    }

  }

  habilitarSiguiente() {
    if (this.dia == 0)
      this.siguiente = false
    else
      this.siguiente = true

  }

  cantidadXDia() {
    console.log(this.dia)
    this.subscription.add(this.srv.lineCJXDC(this.dia).subscribe({
      next: (r1) => {

        this.subscription.add(this.srv.lineCPXDC(this.dia).subscribe({
          next: (r2) => {
    
            console.log(r1, r2)
            this.datos = {
              labels: [r1.fecha],
              datasets: [
                { data: [r1.cantidad], label: 'JUEGOS' },
                { data: [r2.cantidad], label: 'JUGADORES' }
              ]
            }

          },
          error: (e) => {
            console.log('Error al recuperar datos')
          }
        }))

      },
      error: (e) => {
        console.log('Error al recuperar datos')
      }
    }))

  }

  datos: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [] },
      { data: [] }
    ]
  }

  opciones: ChartOptions = {
    responsive: true,
    plugins: {
      title: { text: "Cantidad de juegos y jugadores por día", display: true, font: { size: 26 }, color: 'white', fullSize: true }
    }
  }

}
