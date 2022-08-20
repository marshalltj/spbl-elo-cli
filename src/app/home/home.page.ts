import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from './../services/players/players.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Players: any = [];

  constructor(private route: Router, private playersService: PlayersService) {}

  ionViewDidEnter() {
    this.playersService.getTopPlayers().subscribe((response)=> {
      console.log("home page response: ", response)
      this.Players = response;
    })
  }


  navPlayers(){
    this.route.navigate(['/players']);
  }

  navEvents(){
    this.route.navigate(['/events']);
  }

}
