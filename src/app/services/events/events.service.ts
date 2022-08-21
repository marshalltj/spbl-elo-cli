import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import serviceConfig from '../serviceConfig.json';
import { Event } from '../../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  endpoint = serviceConfig.endpoint;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<Event[]>{
    return this.httpClient.get<Event[]>(this.endpoint + "/events")
      .pipe(
        tap(events => console.log('Events retrieved!', events)),
        catchError(this.handleError<Event[]>('Get events', []))
      );
  }

  getEvent(event){
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.endpoint + "/events/" + event)
      .toPromise()
      .then(
        res => {
          console.log('Event retrieved', res);
          resolve(res);
        }
      )
    });


    return this.httpClient.get<Event>(this.endpoint + "/events/" + event)
      .pipe(
        tap(event => console.log('Event retrieved!', event)),
        catchError(this.handleError<Event>('Get event', new Event))
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
