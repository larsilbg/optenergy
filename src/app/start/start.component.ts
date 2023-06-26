import { Component, OnInit } from '@angular/core';
import {Analyse, Device, UserType} from "../../lib/UserType";
import {Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {AnalyseComponent} from "../analyse/analyse.component";
import {OptimizeComponent} from "../optimize/optimize.component";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertButton} from "@ionic/angular";
import {ProfileComponent} from "../profile/profile.component";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent  implements OnInit {
  analyseComponent = AnalyseComponent;
  optimizeComponent = OptimizeComponent;
  profileComponent = ProfileComponent;
  user?: UserType
  sparvorschlag?: string;
  userSubscription: Subscription | undefined;
  analyse?: Analyse | null;
  devices?: Device[];
  lastAnalyse?: any;
  loggedOut: boolean = false;
  logoutButton: AlertButton = {
    text: 'Anmelden',
    handler: () => {
      this.logout()
    }
  }

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user) => {
        if (user instanceof HttpErrorResponse) {
          this.loggedOut = true;
        } else {
          this.user = user
        }
        this.userService.getSparvorschlag().subscribe(
          (sparvorschlag: {Sparvorschlag: string}) => {
            this.sparvorschlag = sparvorschlag.Sparvorschlag
          }
        )
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
        console.log(analyse)
        this.lastAnalyse = analyse.LetzteAnalyse
        this.analyse = JSON.parse(<string>localStorage.getItem('analyse'));
      }
    )
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }

  logout() {
    localStorage.removeItem('analyse');
    localStorage.removeItem('token');
    window.location.reload();
  }
}
