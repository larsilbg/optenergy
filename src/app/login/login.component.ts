import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {ActionSheetController, LoadingController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  presentingElement?: HTMLElement | null;
  formData: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  showRegister: boolean = false;
  error: boolean = false;

  constructor(private fb:FormBuilder, private loginService: LoginService, private actionSheetCtrl: ActionSheetController, private router: Router, private loadingCtrl: LoadingController) {
    this.presentingElement = document.querySelector('.ion-page');
    this.formData = this.fb.group({
      Email: ['', [Validators.required]],
      Vorname: ['', [Validators.required]],
      Nachname: ['', [Validators.required]],
      Profilbild: ['', [Validators.required]],
      Telefon: ['', [Validators.required]],
      Land: ['', [Validators.required]],
      Rechnungsadresse: ['', [Validators.required]],
      Bankadresse: ['', [Validators.required]],
      Strompreis: ['', [Validators.required]],
      Passwort: ['', [Validators.required]],
    });
  }

  ngOnInit() {}



  login() {
    this.loadingCtrl.create({
      message: 'Lädt...',
    }).then((loading) => {
        loading.present();
        const email = this.formData.get('Email')?.value
        const password = this.formData.get('Passwort')?.value
        const base64 = btoa(`${email}:${password}`);
        this.loginService.userLogin(base64).subscribe((data: any) => {
          this.isLoading = false
          loading.dismiss();
          if (data instanceof HttpErrorResponse) {
            console.log('error')
            this.error = true;
            this.errorMessage = 'Falsche Email oder Passwort';
          } else {
            localStorage.setItem('token', data.accessToken);
            this.router.navigate(['/tabs']);
          }
        });
      }
    )
  }
  register(){
    this.loadingCtrl.create({
      message: 'Lädt...',
    }).then(
      (loading) => {
        var formData = new FormData();
        if(this.formData.valid){
          loading.present();
          this.isLoading = true
          formData.append('Passwort', this.formData.get('Passwort')?.value);
          formData.append('Vorname', this.formData.get('Vorname')?.value);
          formData.append('Nachname', this.formData.get('Nachname')?.value);
          formData.append('Profilbild', this.formData.get('Profilbild')?.value);
          formData.append('Telefon', this.formData.get('Telefon')?.value);
          formData.append('Land', this.formData.get('Land')?.value);
          formData.append('Email', this.formData.get('Email')?.value);
          formData.append('Rechnungsadresse', this.formData.get('Rechnungsadresse')?.value);
          formData.append('Bankadresse', this.formData.get('Bankadresse')?.value);
          formData.append('Strompreis', this.formData.get('Strompreis')?.value);
          this.loginService.userRegister(formData).subscribe((data:any)=>{
            loading.dismiss();
            if(data instanceof HttpErrorResponse){
              this.error = true;
              console.log(data)
              this.errorMessage = data.status === 500 ? 'Etwas ist schief gelaufen...' : 'Diese Email ist leider schon vergeben';
            } else {
              this.showRegister = false
            }
          });
        } else {
          this.error = true;
          this.errorMessage = 'Bitte alle Felder ausfüllen';
        }
      })
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Bist du dir sicher?',
      buttons: [
        {
          text: 'Ja',
          role: 'confirm',
        },
        {
          text: 'Nein',
          role: 'cancel',
        },
      ],
    });
    actionSheet.present();
    const { role } = await actionSheet.onWillDismiss();
    return role === 'confirm';
  };
}
