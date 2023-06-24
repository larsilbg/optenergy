import { Component, OnInit } from '@angular/core';
import {Analyse, Devices, UserType} from "../../lib/UserType";
import {Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {AnalyseComponent} from "../analyse/analyse.component";
import {OptimizeComponent} from "../optimize/optimize.component";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent  implements OnInit {
  analyseComponent = AnalyseComponent;
  optimizeComponent = OptimizeComponent;
  user?: UserType
  userSubscription: Subscription | undefined;
  analyse?: Analyse | null;
  devices?: Devices[];
  lastAnalyse?: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user) => {
        this.user = user
      }
    )
    this.userService.getDevices().subscribe(
      (devices) => {
        console.log(devices)
        this.devices = devices
      }
    )
    this.userService.getLastAnalysis().subscribe(
      (analyse) => {
        this.lastAnalyse = analyse.LetzteAnalyse
      }
    )
    this.analyse = JSON.parse(<string>localStorage.getItem('analyse'));
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }

  logout() {
    localStorage.removeItem('analyse');
    localStorage.removeItem('token');
    window.location.reload();
  }

  openUpgrade() {

  }

  openProfile() {

  }
}
