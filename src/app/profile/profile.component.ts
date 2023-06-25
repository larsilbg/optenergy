import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserType} from "../../lib/UserType";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingController} from "@ionic/angular";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  formData!: FormGroup;
  user?: UserType
  error: boolean = false;
  message: string ="";
  editMode: boolean = false;

  constructor(private fb:FormBuilder, private userService: UserService, private loginService: LoginService, private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user: UserType) => {
        this.user = user
        console.log(user)
        this.formData = this.fb.group({
          Email: [user.Email, [Validators.required]],
          Vorname: [user.Vorname, [Validators.required]],
          Nachname: [user.Nachname, [Validators.required]],
          Profilbild: [user.Profilbild, [Validators.required]],
          Telefon: [user.Telefon, [Validators.required]],
          Land: [user.Land, [Validators.required]],
          Rechnungsadresse: [ user.Rechnungsadresse, [Validators.required]],
          Bankadresse: [user.Bankadresse, [Validators.required]],
          Strompreis: [user.Strompreis, [Validators.required]],
        });
      }
    )
  }

  updateUser(){
    this.loadingCtrl.create({
      message: 'Lädt...',
    }).then(
      (loading) => {
        var formData = new FormData();
        if(this.formData.valid){
          loading.present();
          //formData.append('Passwort', this.formData.get('Passwort')?.value);
          formData.append('Vorname', this.formData.get('Vorname')?.value);
          formData.append('UserID', this.user!.UserID);
          formData.append('Nachname', this.formData.get('Nachname')?.value);
          formData.append('Profilbild', this.formData.get('Profilbild')?.value);
          formData.append('Telefon', this.formData.get('Telefon')?.value);
          formData.append('Land', this.formData.get('Land')?.value);
          formData.append('Email', this.formData.get('Email')?.value);
          formData.append('Rechnungsadresse', this.formData.get('Rechnungsadresse')?.value);
          formData.append('Bankadresse', this.formData.get('Bankadresse')?.value);
          formData.append('Strompreis', this.formData.get('Strompreis')?.value);
          this.userService.userUpdate(formData).subscribe((data:any)=>{
            loading.dismiss();
            if(data instanceof HttpErrorResponse){
              this.error = true;
              console.log(data)
              this.message = 'Etwas ist schief gelaufen...';
            } else {
              this.editMode = false;
              this.message = 'Update erfolgreich';
            }
          });
        } else {
          this.error = true;
          this.message = 'Bitte alle Felder ausfüllen';
        }
      })
  }

}
