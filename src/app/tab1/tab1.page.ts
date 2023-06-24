import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Observable, Subscription} from "rxjs";
import {Devices, UserType} from "../../lib/UserType";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{

  user?: UserType
  userSubscription: Subscription | undefined;
  anaylse: boolean = false;
  devices?: Devices[];

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
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  openUpgrade() {

  }

  openProfile() {

  }
}
