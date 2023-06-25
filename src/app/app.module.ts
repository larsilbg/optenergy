import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard, LoggedInGuard} from "./services/auth-guard.service";
import {StartComponent} from "./start/start.component";
import {AnalyseComponent} from "./analyse/analyse.component";
import {OptimizeComponent} from "./optimize/optimize.component";
import {NgChartsModule} from "ng2-charts";
import {ProfileComponent} from "./profile/profile.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, StartComponent, AnalyseComponent, OptimizeComponent, ProfileComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgChartsModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthGuard, LoggedInGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
