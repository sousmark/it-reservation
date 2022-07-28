import { Injectable } from "@angular/core";
import { CalendarEvent } from "angular-calendar";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private event = new Subject<any>();

  newEvent(e: CalendarEvent) {
    this.event.next(e);    
  }

  onEvent(): Observable<any> {
    return this.event.asObservable();
  }
}