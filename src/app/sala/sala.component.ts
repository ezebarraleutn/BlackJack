import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartasService } from '../cartas.service';
import { Resultado } from '../interfaces/resultado';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit, OnDestroy {

  esJugador: boolean = true;

  esHabilitado: boolean = false;

  resultado: Resultado = {} as Resultado;

  mensaje: string = '';

  private subs: Subscription = new Subscription();

  constructor(private cartas: CartasService) {
  }

  ngOnInit(): void {
  }

  iniciarJuego() {
    this.subs.add(this.cartas.inicio().subscribe({
      next: (result)=>{
        this.resultado = result
        this.esHabilitado = true;
        this.mensaje = "";
        this.esJugador = true;
        this.controlarGanador();
      },
      error: ()=>{
        alert("Error al iniciar partida");
      }
    }))
  }

  pedirCarta() {
    this.subs.add(this.cartas.pedir(this.esJugador).subscribe({
      next: (result)=>{
        this.resultado = result;
        this.controlarGanador();
      },
      error: ()=>{
        alert("Error al pedir carta");
      }
    }))
  }

  stand() {
    this.subs.add(this.cartas.pedirCrupier().subscribe({
      next: (result)=>{
        this.resultado = result;
        this.esJugador = false;
        this.controlarGanador();
      },
      error: ()=>{
        alert("Error en la accion solicitada");
      }
    }))
  }

  obtenerCartas() {
    this.subs.add(this.cartas.obtenerCartas().subscribe({
      next: (result)=>{
        this.resultado = result
      },
      error: ()=>{
        alert("Error al obtener cartas");
      }
    }))
  }

  controlarGanador() {
    if (this.resultado.totalC > 21 || (this.resultado.totalJ == 21 && this.resultado.cartasJ.length == 2) || (this.resultado.totalJ > this.resultado.totalC && !this.esJugador)) {
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

  ngOnDestroy():void{
    this.subs.unsubscribe();
  }

}
