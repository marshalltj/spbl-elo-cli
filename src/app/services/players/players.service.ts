import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import serviceConfig from '../serviceConfig.json';

export class Player {
  name: string;
  elo: number;
  wins: number;
  losses: number;
  role: string;
  offrole: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  endpoint = serviceConfig.endpoint;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getTopPlayers(): Observable<Player[]>{
    return this.httpClient.get<Player[]>(this.endpoint)
      .pipe(
        tap(players => console.log('Top Players retrieved!', players)),
        catchError(this.handleError<Player[]>('Get top players', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
}
