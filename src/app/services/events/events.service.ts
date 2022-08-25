import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import serviceConfig from '../serviceConfig.json';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  endpoint = serviceConfig.endpoint;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getEvents(){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/events")
      .toPromise()
      .then(
        res => {
          console.log('Events retrieved');
          resolve(res);
        }
      )
    });
  }

  getEvent(event){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/events/" + event)
      .toPromise()
      .then(
        res => {
          console.log('Event retrieved');
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
