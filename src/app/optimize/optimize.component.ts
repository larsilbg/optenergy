import { Component, OnInit } from '@angular/core';
import {Analyse} from "../../lib/UserType";

@Component({
  selector: 'app-optimize',
  templateUrl: './optimize.component.html',
  styleUrls: ['./optimize.component.scss'],
})
export class OptimizeComponent  implements OnInit {
  analyse?: Analyse | null;
  constructor() { }

  ngOnInit() {
    this.analyse = JSON.parse(<string>localStorage.getItem('analyse'));
  }

}
