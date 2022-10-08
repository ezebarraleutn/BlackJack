import { Component, OnInit } from '@angular/core';
import { CartasService } from '../cartas.service';
import { Carta } from '../interfaces/carta';
import { Resultado } from '../interfaces/resultado';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  esJugador: boolean = true;

  esHabilitado: boolean = false;

  resultado: Resultado = {} as Resultado;

  mensaje: string = '';

  constructor(private cartas: CartasService) {
  }

  ngOnInit(): void {
  }

  iniciarJuego() {
    this.esHabilitado = true;
    this.mensaje = "";
    this.cartas.reseteo();
    this.esJugador = true;
    this.cartas.inicio();
    this.obtenerCartas();
    this.controlarGanador();
  }

  pedirCarta() {
    this.cartas.pedir(this.esJugador);
    this.obtenerCartas();
    this.controlarGanador();
  }

  stand() {
    this.esJugador = false;
    this.cartas.pedirCrupier();
    this.obtenerCartas();
    this.controlarGanador();
  }

  obtenerCartas() {
    this.resultado = this.cartas.obtenerCartas();
  }

  controlarGanador() {
    if (this.resultado.totalC > 21 || (this.resultado.totalJ == 21 && this.cartas.cartasJ.length == 2) || (this.resultado.totalJ > this.resultado.totalC && !this.esJugador)) {
      this.mensaje = "GANASTE!!";
      this.esHabilitado = false;
    } else if ((this.resultado.totalC > this.resultado.totalJ && !this.esJugador) || this.resultado.totalJ > 21) {
      this.mensaje = "PERDISTE";
      this.esHabilitado = false;
    } else if (this.resultado.totalC == this.resultado.totalJ && !this.esJugador) {
      this.mensaje = "EMPATE";
      this.esHabilitado = false;
    } 
  }

}
