import { Game } from './game.model';
import { SpblEvent } from './spbl-event.model';
import { Response } from './response.model';

export class Team {
  id: number;
  captain: string;
  team_name: string;
  games: Game[];
  event: SpblEvent;

  constructor(team?: any){
    if (team)
    {
      this.id = team.id;
      this.captain = team.captain;
      this.team_name = team.team_name;
    }
    this.games = new Array();
  }
}