import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from "angular-calendar";
import { isSameDay, isSameMonth } from "date-fns";
import { Observable, Subject, Subscription } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { NotificationTypes } from "src/app/models/enums/notificationTypes";
import { AuthenticationService } from "src/app/services/authentication.service";
import { NotificationService } from "src/app/services/notification.service";
import { EventModel } from "../models/event.model";
import { ServiceModel } from "../models/service.model";
import { CalendarService } from "../services/calendar.service";

@Component({
  selector: "ngbd-modal-content",
  template: `
    <form [formGroup]="eventForm">
      <div class="modal-header">
        <h4 class="modal-title">New reservation</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ng-container *ngIf="services$ | async as services">
          <div class="form-group">
            <label>Service</label>
            <select class="form-control" formControlName="service" (ngModelChange)="onChange($event)">
              <option *ngFor="let service of services" [value]="service.id">{{ service.name }} ({{ service.id_employee }})</option>
            </select>
          </div>
        </ng-container>
        <div class="form-group">
          <label>Title</label>
          <input class="form-control" placeholder="Enter title" formControlName="title" />
        </div>
        <div class="form-group">
          <label>Date</label><br />
          <input type="date" class="form-control" formControlName="date" />
        </div>
        <div class="form-row">
          <div class="col">
            <label>From</label>
            <select name="option" class="form-control" formControlName="from" size="3">
              <option *ngFor="let op of options" [value]="op.id">
                {{ op.description }}
              </option>
            </select>
          </div>
          <div class="col">
            <label>To</label>
            <select name="option" class="form-control" formControlName="to" size="3">
              <option *ngFor="let op of options" [value]="op.id">
                {{ op.description }}
              </option>
            </select>
          </div>
        </div>
        <br />
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" placeholder="Enter description" formControlName="description"></textarea>
        </div>
        <div class="form-group">
          <label>Client e-mail</label>
          <input class="form-control" placeholder="Enter client e-mail" formControlName="client" />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="create()">{{ "CALENDAR.CEATE" | translate }}</button>
      </div>
    </form>
  `,
})
export class NgbdModalContent {
  @Input() name;

  eventForm = new FormGroup({
    service: new FormControl(""),
    title: new FormControl({ value: "", disabled: true }),
    date: new FormControl(""),
    from: new FormControl(""),
    to: new FormControl(""),
    description: new FormControl({ value: "", disabled: true }),
    client: new FormControl(""),
  });

  options = [
    { id: 0, description: "07:00" },
    { id: 1, description: "07:30" },
    { id: 2, description: "08:00" },
    { id: 3, description: "08:30" },
    { id: 4, description: "09:00" },
    { id: 5, description: "09:30" },
    { id: 6, description: "10:00" },
    { id: 7, description: "10:30" },
    { id: 8, description: "11:00" },
    { id: 9, description: "11:30" },
    { id: 10, description: "12:00" },
    { id: 11, description: "12:30" },
    { id: 12, description: "13:00" },
    { id: 13, description: "13:30" },
    { id: 14, description: "14:00" },
    { id: 15, description: "14:30" },
    { id: 16, description: "15:00" },
    { id: 17, description: "15:30" },
    { id: 18, description: "16:00" },
    { id: 19, description: "16:30" },
    { id: 20, description: "17:00" },
    { id: 21, description: "17:30" },
    { id: 22, description: "18:00" },
  ];

  services$: Observable<ServiceModel[]>;
  services: ServiceModel[];

  constructor(
    public activeModal: NgbActiveModal,
    private calendarSerice: CalendarService,
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {
    var httpOptions = {
      headers: new HttpHeaders({ token: localStorage.getItem(this.authenticationService.authLocalStorageToken) }),
    };

    this.services$ = this.httpClient.get<ServiceModel[]>("http://localhost:3000/api/service", httpOptions).pipe(
      map((services: ServiceModel[]) => {
        return services;
      }),
      tap((services: ServiceModel[]) => {
        this.services = services;
      }),
      catchError((error) => {
        this.notificationService.notify(NotificationTypes.FAILURE, "Unable to get services");
        this.activeModal.close("Close click");
        this.authenticationService.logout();
        throw new Error("Unable to get services");
      })
    );
  }

  onChange(id) {
    var service = this.services.find((service) => (service.id == id));
    this.eventForm.get("title").setValue(service.title);
    this.eventForm.get("description").setValue(service.description);
  }

  create() {
    var values = this.eventForm.value;

    if (values.title === "" || values.description === "" || values.date === "" || values.from === "" || values.to === "") {
      alert("Please fill all fieds");
      return;
    }

    if (values.from >= values.to) {
      alert("End date is not correct");
      return;
    }

    var from = new Date(values.date);
    from.setHours(Number(this.options[values.from].description.split(":")[0]));
    from.setMinutes(Number(this.options[values.from].description.split(":")[1]));
    var to = new Date(values.date);
    to.setHours(Number(this.options[values.to].description.split(":")[0]));
    to.setMinutes(Number(this.options[values.to].description.split(":")[1]));
    console.log();
    
    this.httpClient.post("http://localhost:3000/api/event", values).pipe(
      //TODO : send invitation to client and to employee
      catchError((error) => {
        this.notificationService.notify(NotificationTypes.FAILURE, "Unable to create event");
        this.activeModal.close("Close click");
        this.authenticationService.logout();
        throw new Error("Unable to create event");
      })
    );

    this.calendarSerice.newEvent({
      title: this.eventForm.get("title").value + ", by " + this.authenticationService.getCurrentUserValue().Name + " " + this.authenticationService.getCurrentUserValue().Surname,
      description: this.eventForm.get("description").value,
      start: from,
      end: to,
    });

    this.activeModal.close("Close click");
  }
}

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"],
})
export class AppointmentComponent implements OnInit {
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: "Edit",
      onClick: ({ event }: { event: CalendarEvent }): void => {},
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: "Delete",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: "A 3 day event",
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: "An event with no end date",
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: "A long event that spans 2 months",
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: "A draggable and resizable event",
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;
  subscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private calendarService: CalendarService,
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.subscription = this.calendarService.onEvent().subscribe((event) => {
      this.events = [...this.events, event];
      this.refresh.next();
    });

    var httpOptions = {
      headers: new HttpHeaders({ token: localStorage.getItem(this.authenticationService.authLocalStorageToken) }),
    };

    this.httpClient.get<EventModel[]>("http://localhost:3000/api/event", httpOptions).subscribe(
      (e) => {
        e.forEach((event) => {
          var from = new Date(event.date);
          from.setHours(Number(event.start.split(":")[0]));
          from.setMinutes(Number(event.start.split(":")[1]));
          var to = new Date(event.date);
          to.setHours(Number(event.finish.split(":")[0]));
          to.setMinutes(Number(event.finish.split(":")[1]));
          this.events = [
            ...this.events,
            {
              title: event.title + ", by " + event.creator,
              description: event.description,
              start: from,
              end: to,
            },
          ];
          this.refresh.next();
        });
      },
      (error) => {
        this.authenticationService.logout();
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  newEvent() {
    const modalRef = this.modalService.open(NgbdModalContent);
  }
}
