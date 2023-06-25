import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, switchMap} from "rxjs";
import {UserType} from "../../lib/UserType";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = "https://optenergy.immotickety.de/api/user/"
  constructor(private http:HttpClient) {}

  userLogin(req: string): Observable<any>{
    return this.http.get(`${this.API_URL}login/`, {headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    );
  }

  userRegister(req: FormData): Observable<any>{
    const body= {
      Vorname: req.get('Vorname'),
      Nachname: req.get('Nachname'),
      Profilbild: req.get('Profilbild'),
      Telefon: req.get('Telefon'),
      Land: req.get('Land'),
      Email: req.get('Email'),
      IstPremium: false,
      Rechnungsadresse: req.get('Rechnungsadresse'),
      Bankadresse: req.get('Bankadresse'),
      Passwort: req.get('Passwort'),
      Strompreis: req.get('Passwort'),
    }
    console.log(body)
    return this.http.post(`${this.API_URL}`, body).pipe(
      catchError(err => of(err))
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
