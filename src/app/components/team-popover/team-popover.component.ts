import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TeamsService } from './../../services/teams/teams.service';

@Component({
  selector: 'app-team-popover',
  templateUrl: './team-popover.component.html',
  styleUrls: ['./team-popover.component.scss'],
})
export class TeamPopoverComponent implements OnInit {
  games: any = []
  players: any = [];

  @Input() teamId: string;
  @Input() teams: any [];

  constructor(private teamsService: TeamsService) { }

  async ionViewDidEnter() {
    this.games = await this.teamsService.getGames(this.teamId);
    this.players = await this.teamsService.getPlayers(this.teamId);
  }

  findWinner(id){
    return this.teams.find(x=>x.id === id).team_name
  }

  ngOnInit() {}

}
