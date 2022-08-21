/*
home page TODO:
  -on player name click, route to players page w/ nav extras of selected player
  -numbered ranks
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from './../services/players/players.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  players: any = [];

  constructor(private route: Router, private playersService: PlayersService) {}

  async ionViewDidEnter() {
    this.players = await this.playersService.getTopPlayers();
  }

  navPlayers(){
    this.route.navigate(['/players']);
  }

  navEvents(){
    this.route.navigate(['/events']);
  }

}
