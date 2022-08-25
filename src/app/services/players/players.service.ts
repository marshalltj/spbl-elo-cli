import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import serviceConfig from '../serviceConfig.json';
import { Game } from '../../models/game.model';
import { Response } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  endpoint = serviceConfig.endpoint;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  async getTopPlayers(){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/players/top")
      .toPromise()
      .then(
        res => {
          console.log('Top player retrieved');
          resolve(res);
        }
      )
    });
  }

  getPlayers(){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/players")
      .toPromise()
      .then(
        res => {
          console.log('Players retrieved');
          resolve(res);
        }
      )
    });
  }

  getTeams(player){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/players/" + player + "/teams")
      .toPromise()
      .then(
        res => {
          console.log('Teams retrieved');
          resolve(res);
        }
      )
    });
  }

  getGamesByTeam(player, team){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/teams/" + team + "/games/" + player)
      .toPromise()
      .then(
        res => {
          console.log('Games retrieved');
          resolve(res);
        }
      )
    });
  }

  getPlayersInGame(team, game){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/teams/" + team + "/players/" + game)
      .toPromise()
      .then(
        res => {
          console.log('Players retrieved');
          resolve(res);
        }
      )
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
}
