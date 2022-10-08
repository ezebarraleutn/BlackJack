import { Component, OnInit, Input } from '@angular/core';
import { CartasService } from '../cartas.service';
import { Carta } from '../interfaces/carta';
import { Resultado } from '../interfaces/resultado';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() resultado: Resultado = {} as Resultado;

  constructor(private cartas: CartasService) { 
  }

  ngOnInit(): void {
  }

}
