import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartasService } from '../cartas.service';
import { Resultado } from '../interfaces/resultado';
import { Subscription, switchAll } from 'rxjs';
import { Player } from '../interfaces/player';
import { LoginService } from '../autenticacion/login.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit, OnDestroy {

  player: Player = {} as Player;

  private suscripcion = new Subscription();

  esJugador: boolean = true;

  esHabilitado: boolean = false;

  resultado: Resultado = {} as Resultado;

  mensaje: string = '';

  constructor(
    private srv: LoginService,
    private cartas: CartasService) {
  }

  ngOnInit(): void {
    this.player.nombre = this.srv.getUser().username;

    this.suscripcion.add(this.cartas.esFinalizada(this.player.nombre).subscribe({
      next: (data) => {
        if (!data) {
          Swal.fire({
            title: 'Existe una partida sin finalizar',
            text: 'Desea continuarla?',
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: 'Continuar Partida',
            denyButtonText: 'No continuar',
            confirmButtonColor: '#007bff'
          }).then((result) => {
            if (result.isConfirmed) {

              this.suscripcion.add(this.cartas.ultima(this.player.nombre).subscribe({
                next: (result) => {
                  this.resultado = result
                  this.esHabilitado = true;
                  this.mensaje = "";
                  this.esJugador = true;
                  this.controlarGanador();
                },
                error: () => {
                  console.log("Error al iniciar partida, intente nuevamente")
                }
              }))
              
            }
          })
        }
      }
    }))
  }

  iniciarJuego() {
    this.suscripcion.add(this.cartas.inicio(this.player.nombre).subscribe({
      next: (result) => {
        this.resultado = result
        this.esHabilitado = true;
        this.mensaje = "";
        this.esJugador = true;
        this.controlarGanador();
      },
      error: () => {
        console.log("Error al iniciar partida, intente nuevamente")
      }
    }))
  }

  pedirCarta() {
    this.suscripcion.add(this.cartas.pedir(this.resultado.idresultado, this.player.nombre, this.esJugador).subscribe({
      next: (result) => {
        this.resultado = result;
        this.controlarGanador();
      },
      error: () => {
        console.log("Error al pedir carta, intente nuevamente")
      }
    }))
  }

  stand() {
    this.esJugador = false;
    this.suscripcion.add(this.cartas.pedir(this.resultado.idresultado, this.player.nombre, this.esJugador).subscribe({
      next: (result) => {
        this.resultado = result;
        this.controlarGanador();
      },
      error: () => {
        console.log("Error en la accion solicitada, intente nuevamente");
      }
    }))
  }

  controlarGanador() {
    if (this.resultado.totalC > 21 || (this.resultado.totalJ == 21 && this.resultado.cartasJ.length == 2) || (this.resultado.totalJ > this.resultado.totalC && !this.esJugador)) {
      this.mensaje = "GANASTE!!";
      this.esHabilitado = false;
      this.resultado.ganador = 2;
    } else if ((this.resultado.totalC > this.resultado.totalJ && !this.esJugador) || this.resultado.totalJ > 21) {
      this.mensaje = "PERDISTE";
      this.esHabilitado = false;
      this.resultado.ganador = 1;
    } else if (this.resultado.totalC == this.resultado.totalJ && !this.esJugador) {
      this.mensaje = "EMPATE";
      this.esHabilitado = false;
      this.resultado.ganador = 3;
    }

    if(this.mensaje != ''){

      this.suscripcion.add(this.cartas.esGanador(this.resultado.idresultado, this.resultado.ganador).subscribe({
        next: () => {
          Swal.fire({
            title: this.mensaje,
            text: this.player.nombre+ ' ' +this.resultado.totalJ+ ' : ' +this.resultado.totalC+ ' ' + 'CRUPIER',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#007bff'
          })
        },
        error: () => {
          console.log("Error en la accion solicitada");
        }
      }))

      
    }
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

}
