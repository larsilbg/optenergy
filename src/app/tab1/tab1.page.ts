import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Observable, Subscription} from "rxjs";
import {Device, UserType} from "../../lib/UserType";
import {StartComponent} from "../start/start.component";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  startComponent = StartComponent;
}
