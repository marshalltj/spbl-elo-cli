import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import serviceConfig from '../serviceConfig.json';
import { Response } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  endpoint = serviceConfig.endpoint;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getGames(team){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/teams/" + team + "/games")
      .toPromise()
      .then(
        res => {
          console.log('Games retrieved');
          resolve(res);
        }
      )
    });
  }

  getTeams(event){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/events/" + event + "/teams")
      .toPromise()
      .then(
        res => {
          console.log('Games retrieved');
          resolve(res);
        }
      )
    });
  }

  getTeam(team){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/teams/" + team)
      .toPromise()
      .then(
        res => {
          console.log('Team retrieved');
          resolve(res);
        }
      )
    });
  }

  getPlayers(team){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/teams/" + team + "/players")
      .toPromise()
      .then(
        res => {
          console.log('Players for Team retrieved');
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
