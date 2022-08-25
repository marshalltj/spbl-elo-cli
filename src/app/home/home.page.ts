/*
home page TODO:
  -on player name click, route to players page w/ nav extras of selected player
  -numbered ranks
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PlayersService } from './../services/players/players.service';
import { EventsService } from './../services/events/events.service';

import { SpblEvent } from './../models/spbl-event.model';
import { Response } from './../models/response.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  players: any = [];
  nextEvent: SpblEvent = new SpblEvent();
  dateStr: string = "";

  constructor(private route: Router, 
              private playersService: PlayersService,
              private eventsService: EventsService) {}

  async ionViewDidEnter() {
    var playersResponse: Response = await this.playersService.getTopPlayers();
    this.players = playersResponse.data;
    var eventsResponse: Response = await this.eventsService.getEvents();
    this.nextEvent = eventsResponse.data[0];
    this.dateStr = new Date(this.nextEvent.date).toLocaleDateString();
  }

  navPlayers(){
    this.route.navigate(['/players']);
  }

  navEvents(){
    this.route.navigate(['/events']);
  }

  navAbout(){
    this.route.navigate(['/about']);
  }

}
