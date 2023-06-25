import { Component, OnInit } from '@angular/core';
import {Analyse, Device, Optimierung} from "../../lib/UserType";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-optimize',
  templateUrl: './optimize.component.html',
  styleUrls: ['./optimize.component.scss'],
})
export class OptimizeComponent  implements OnInit {
  analyse?: Analyse | null;
  optimierung?: Optimierung;
  devices? :Device[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.analyse = JSON.parse(<string>localStorage.getItem('analyse'));
    localStorage.removeItem('analyse');
    this.userService.optimize(this.analyse!).subscribe( (optimierung: Optimierung) => {
      this.optimierung = optimierung;
      console.log(optimierung)
      this.devices = optimierung.steckdosen;
    })
  }

}
