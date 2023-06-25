import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Devices, UserType} from "../../lib/UserType";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  devices!: Devices[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getDevices().subscribe(
      (devices) => {
        this.devices = devices
      })
  }

}
