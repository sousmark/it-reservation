import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { NotificationTypes } from "src/app/models/enums/notificationTypes";
import { AuthenticationService } from "src/app/services/authentication.service";
import { NotificationService } from "src/app/services/notification.service";
import { ServiceModel } from "../models/service.model";

@Component({
  selector: "app-list-services",
  templateUrl: "./list-services.component.html",
  styleUrls: ["./list-services.component.scss"],
})
export class ListServicesComponent implements OnInit {
  services$: Observable<ServiceModel[]>;
  services: ServiceModel[];

  constructor(
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
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
        this.authenticationService.logout();
        throw new Error("Unable to get services");
      })
    );
  }

  newService() {
    const modalRef = this.modalService.open(NgbdModalContent);
  }
}

@Component({
  selector: "ngbd-modal-content",
  template: `
    <form [formGroup]="serviceForm">
      <div class="modal-header">
        <h4 class="modal-title">New service</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Name</label>
          <input class="form-control" placeholder="Enter name" formControlName="name">
        </div>
        <div class="form-group">
          <label>Title</label>
          <input class="form-control" placeholder="Enter title" formControlName="title">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" placeholder="Enter description" formControlName="description"></textarea>
        </div>
        <div class="form-group">
          <label>Emplyee</label>
          <input class="form-control" placeholder="Enter employee e-mail" formControlName="employee">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="create()">Create</button>
      </div>
    </form>
  `,
})
export class NgbdModalContent {
  serviceForm = new FormGroup({
    name: new FormControl(""),
    title: new FormControl(""),
    description: new FormControl(""),
    employee: new FormControl(""),
  });

  constructor(public activeModal: NgbActiveModal) {}

  create() {
    var values = this.serviceForm.value;

    if (values.name === "" || values.title === "" || values.description === "" || values.employee === "") {
      alert("Please fill all fieds");
      return;
    }

    //TODO: POST SERVICE
  }
}
