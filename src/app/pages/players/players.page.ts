/*
Player page TODO:
  -Reset the ion-select when "clear selection button is pressed"
  -Get a hover/click/route when clicking on an opponent team to see the players who played on that team in that specific game
  -numbered ranks
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlayersService } from './../../services/players/players.service';
import { TeamsService } from './../../services/teams/teams.service';
import { EventsService } from './../../services/events/events.service';

import { Player } from './../../models/player.model';
import { Team } from './../../models/team.model';
import { Response } from './../../models/response.model';
import { Event } from './../../models/event.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  players: any = [];
  eloTally: number;
  selectedPlayer: Player = new Player();
  selectPlaceholder = "Select a Player";

  constructor(private route: Router, 
              private playersService: PlayersService, 
              private teamsService: TeamsService,
              private eventsService: EventsService) {}

  async ionViewDidEnter() {
    this.players = await this.playersService.getPlayers()
  }

  ngOnInit() {
  }

  async getPlayerResults(player){
    this.selectedPlayer = new Player(player);
    this.selectPlaceholder = this.selectedPlayer.name;
    this.eloTally = this.selectedPlayer.elo;

    var teamResponse: Response = await this.playersService.getTeams(this.selectedPlayer.name);
    
    var tmpTeam:Team;    
    for (var team of teamResponse.data){
      tmpTeam = new Team(team);
      var gameResponse: Response = await this.playersService.getGamesByTeam(this.selectedPlayer.name, team.id);
      tmpTeam.games = gameResponse.data;
      var eventResponse: Response = await this.eventsService.getEvent(team.event);
      tmpTeam.event = new Event(eventResponse.data[0]);
      this.selectedPlayer.teams.push(tmpTeam);
    }    

    console.log(this.selectedPlayer)
  }

  clearSelection(){
    this.selectedPlayer = new Player();
    this.selectPlaceholder = "Select a Player";
  }

  navHome(){
    this.route.navigate(['/home']);
  }

}
