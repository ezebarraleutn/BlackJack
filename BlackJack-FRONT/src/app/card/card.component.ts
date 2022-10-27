import { Component, Input, OnInit } from '@angular/core';
import { Carta } from '../interfaces/carta';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() carta: Carta = {} as Carta;

  constructor() { }

  ngOnInit(): void {
  }

}
