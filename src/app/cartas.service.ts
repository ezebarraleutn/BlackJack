import { Injectable } from '@angular/core';
import { Carta } from './interfaces/carta';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  tipos: string[] = ["C", "H", "D", "S"];

  cartasC: Carta[] = [];
  cartasJ: Carta[] = [];

  totalC: number = 0;
  totalJ: number = 0;

  flagC: boolean = false;

  aceCountJ: number = 0;
  aceCountC: number = 0;

  constructor() { }

  pedir(id: boolean) {

    let total: number = 0;
    //let aceCount: number = 0;

    let carta: Carta = {} as Carta;

    carta.numero = Math.floor(Math.random() * 13) + 1;

    if (carta.numero > 10) {
      carta.valor = 10
    } else if (carta.numero == 1) {
      carta.valor = 11
      if (id) {
        this.aceCountJ++;
      } else {
        this.aceCountC++;
      }

    } else {
      carta.valor = carta.numero
    }

    carta.tipo = this.tipos[Math.floor(Math.random() * 4)];

    carta.img = "../../assets/img/cartas/" + carta.numero + carta.tipo + ".svg"

    if (id) {
      this.cartasJ.push(carta);

      total = this.totalJ + carta.valor;

      if (total > 21 && this.aceCountJ > 0) {
        this.reducir(id, total, this.aceCountJ);
      } else {
        this.totalJ = total;
      }

    } else {
      this.cartasC.push(carta);

      total = this.totalC + carta.valor;

      if (total > 21 && this.aceCountC > 0) {
        this.reducir(id, total, this.aceCountC);
      } else {
        this.totalC = total;
      }
    }
  }

  pedirCrupier() {
    if (this.cartasC.length == 0) {
      this.pedir(false);
    } else {
      do {
        this.pedir(false);
      }
      while (this.totalC < 17)
    }

  }

  inicio() {
    this.reseteo();
    for (let index = 0; index < 3; index++) {

      if (index == 1) {
        this.pedirCrupier();
      } else {
        this.pedir(true);
      }
    }
  }

  reseteo() {
    this.aceCountJ = 0;
    this.aceCountC = 0;
    this.cartasJ = [];
    this.cartasC = [];
    this.totalJ = 0;
    this.totalC = 0;
  }

  reducir(id: boolean, total: number, aceCount: number) {
    if (id) {
      this.totalJ = total - (10 * aceCount);
    } else {
      this.totalC = total - (10 * aceCount);
    }
  }

  obtenerCartas() {
    return {
      cartasJ: this.cartasJ,
      cartasC: this.cartasC,
      totalJ: this.totalJ,
      totalC: this.totalC
    }
  }

}