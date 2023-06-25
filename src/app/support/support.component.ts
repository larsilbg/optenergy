import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {ActionSheetController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {UserType} from "../../lib/UserType";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent  implements OnInit {
  formData: FormGroup;
  isLoading: boolean = false;
  message: string = '';
  open: boolean = false;
  user?: UserType;

  constructor(private fb:FormBuilder, private userService: UserService, private actionSheetCtrl: ActionSheetController, private loadingCtrl: LoadingController) {
    this.userService.getUser().subscribe((data: any) => {
      this.user = data;
    }
    );
    this.formData = this.fb.group({
      betreff: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  send() {
    this.loadingCtrl.create({
      message: 'Lädt...',
    }).then((loading) => {
        loading.present();
        const betreff = this.formData.get('betreff')?.value
        const text = this.formData.get('text')?.value
        this.userService.sendSupportMessage(this.user!.Email, betreff, text).subscribe((data: any) => {
          this.isLoading = false
          loading.dismiss();
          if (data instanceof HttpErrorResponse) {
            console.log('error')
            this.open = true;
            this.message = 'Fehler beim Senden der Nachricht';
          } else {
            this.message = 'Nachricht erfolgreich gesendet';
            this.open = true;
          }
        });
    });
  }
}
