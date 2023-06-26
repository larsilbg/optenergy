import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, switchMap, tap} from "rxjs";
import {Analyse, Device, UserType} from "../../lib/UserType";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<boolean>(true);
  private deviceSubject = new BehaviorSubject<boolean>(true);
  private groupSubject = new BehaviorSubject<boolean>(true);
  private analyseSubject = new BehaviorSubject<boolean>(true);

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
    return this.deviceSubject.pipe(
      switchMap(() => {
          return this.http.get(`${this.API_URL}steckdosen/`, {headers: {'Authorization': `${req}`}}).pipe(
            catchError(err => of(err))
          )
        }
      ))
  }

  getAnalysis(days: number): Observable<any>{
    const req = localStorage.getItem('token');
    const analyse = this.http.get(`${this.API_URL}analyse/?days=${days}`, {headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err)),
      tap((analyse) => { localStorage.setItem('analyse', JSON.stringify(analyse)); this.analyseSubject.next(true);})
    );
    return analyse;
  }

  getLastAnalysis(): Observable<any>{
    const req = localStorage.getItem('token');
    return this.analyseSubject.pipe(
      switchMap(() => {
      return this.http.get(`${this.API_URL}analyse/last/`, {headers: {'Authorization': `${req}`}}).pipe(
        catchError(err => of(err))
       );
      }))
  }

  addDevice(device: Device) {
    const req = localStorage.getItem('token');
    return this.http.post(`${this.API_URL}steckdosen/`, device,{headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    ).pipe(tap(() => {
        this.deviceSubject.next(true);
      }
    ));
  }

  getDeviceGroups() {
    const req = localStorage.getItem('token');
    return this.deviceSubject.pipe(
      switchMap(() => {
          return this.http.get(`${this.API_URL}steckdosen/gruppen/`, {headers: {'Authorization': `${req}`}}).pipe(
            catchError(err => of(err))
          )
        }))
  }

  editDevice(device: Device) {
    const req = localStorage.getItem('token');
    return this.http.put(`${this.API_URL}steckdosen/`, device,{headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    ).pipe(tap(() => {
        this.deviceSubject.next(true);
      }
    ));
  }

  addDeviceGroup(group: { Bezeichnung: string }) {
    const req = localStorage.getItem('token');
    return this.http.post(`${this.API_URL}steckdosen/gruppen/`, group,{headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    ).pipe(tap(() => {
        this.deviceSubject.next(true);
        this.groupSubject.next(true);
      }
    ));
  }

  deleteDevice(SteckdosenID: string) {
    const req = localStorage.getItem('token');
    return this.http.delete(`${this.API_URL}steckdosen/?SteckdoseID=${SteckdosenID}`,{headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    ).pipe(tap(() => {
        this.deviceSubject.next(true);
      }
    ));
  }

  optimize(analyse: Analyse){
    const req = localStorage.getItem('token');
    this.analyseSubject.next(true)
    return this.http.post(`${this.API_URL}optimierung/`, analyse,{headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    );
  }

  sendSupportMessage(empfaenger: string,betreff: string, text: string){
    const req = localStorage.getItem('token');
    return this.http.post(`${this.API_URL}support/`, {empfaenger:empfaenger,betreff: betreff, text: text},{headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    );
  }

  getSparvorschlag(){
    const req = localStorage.getItem('token');
    return this.http.get(`${this.API_URL}sparvorschlaege/`,{headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    );
  }
}
