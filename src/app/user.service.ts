import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {UserType} from "../lib/UserType";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = "https://optenergy.immotickety.de/api/"
  constructor(private http:HttpClient) {

  }

  getUser(): Observable<any>{
    const req = localStorage.getItem('token');
    return this.http.get(`${this.API_URL}user/`, {headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    );
  }

  getDevices(): Observable<any>{
    const req = localStorage.getItem('token');
    return this.http.get(`${this.API_URL}steckdosen/`, {headers: {'Authorization': `${req}`}}).pipe(
      catchError(err => of(err))
    );
  }

}
