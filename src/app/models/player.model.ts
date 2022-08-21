import { Team } from './team.model';

export class Player {
  name: string;
  elo: number;
  wins: number;
  losses: number;
  role: string;
  offrole: string;
  teams: Team[];

  constructor(player?: any){
    if(player){
      this.name = player.name;
      this.elo = player.elo;
      this.wins = player.wins;
      this.losses = player.losses;
      this.role = player.role;
      this.offrole = player.offrole;
    }
    this.teams = new Array();
  }
}