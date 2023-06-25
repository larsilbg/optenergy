import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, switchMap, tap} from "rxjs";
import {Analyse, UserType} from "../../lib/UserType";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<boolean>(true);

  API_URL = "https://optenergy.immotickety.de/api/"
  constructor(private http:HttpClient) {

  }

  getUser(): Observable<any>{
    const req = localStorage.getItem('token');
    return this.userSubject.pipe(
      switchMap(() => {
        return this.http.get(`${this.API_URL}user/`, {headers: {'Authorization': `${req}`}}).pipe(
          catchError(err => of(err))
        );
      }
    ))
  }

  userUpdate(req: FormData): Observable<any>{
    const token = localStorage.getItem('token');
    const body= {
      UserID: req.get('UserID') as string,
      Vorname: req.get('Vorname') as string,
      Nachname: req.get('Nachname') as string,
      Profilbild: req.get('Profilbild') as string,
      Telefon: req.get('Telefon') as string,
      Land: req.get('Land') as string,
      Email: req.get('Email') as string,
      IstPremium: false,
      Rechnungsadresse: req.get('Rechnungsadresse') as string,
      Bankadresse: req.get('Bankadresse') as string,
      Strompreis: req.get('Strompreis') as string,
    }
    return this.http.put(`${this.API_URL}user/`, body, {headers: {'Authorization': `${token}`}}).pipe(tap(() => {
      this.userSubject.next(true);
    }
    ));
  }

  getDevices(): Observable<any>{
    const req = localStorage.getItem('token');
    return this.http.get(`${this.API_URL}steckdosen/`, {headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    );
  }

  getAnalysis(days: number): Observable<any>{
    const req = localStorage.getItem('token');
    return this.http.get(`${this.API_URL}analyse/?days=${days}`, {headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    );
  }

  getLastAnalysis(): Observable<any>{
    const req = localStorage.getItem('token');
    return this.http.get(`${this.API_URL}analyse/last/`, {headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    );
  }
}
