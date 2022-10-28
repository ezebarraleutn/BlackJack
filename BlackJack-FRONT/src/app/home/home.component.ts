import { Component, OnInit } from '@angular/core';
import { Player } from '../interfaces/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  player: Player = {} as Player;

  constructor(private router: Router) {
    this.router.navigateByUrl("registrar");
  }

  ngOnInit(): void {
  }

}
