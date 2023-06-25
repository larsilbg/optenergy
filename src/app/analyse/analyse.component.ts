import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {ChartType, ChartConfiguration, ChartOptions} from "chart.js";
import { default as Annotation } from 'chartjs-plugin-annotation';
import {Analyse, Device} from "../../lib/UserType";
import {Subscription, timeout} from "rxjs";
import {LoadingController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss'],
})
export class AnalyseComponent  implements OnInit {

  title = 'Deine persönliche Analyse';
  analyse: Analyse | undefined;
  datasets: any[] = [];
  labels: any[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.labels,
    datasets: this.datasets
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;

  analysisSubscription: Subscription | undefined;


  constructor(private userService: UserService,  private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.loadingCtrl.create({
      message: 'Lädt...',
      duration: 500
    }).then((loading) => {
        loading.present();
        setTimeout(() => {
          this.analysisSubscription = this.userService.getAnalysis(1).subscribe(
            (analyse) => {
              analyse.steckdosen?.forEach((steckdose: Device, index:number) => {
                this.datasets.push({
                  data: steckdose.Verbrauch,
                  label: steckdose.Bezeichnung,
                  fill: true,
                  tension: 0.5,
                  borderColor: this.getColor(index),
                  backgroundColor: 'rgba(54,255,0,0.3)'
                })
              })
              analyse.steckdosen[0]?.Verbrauch.forEach((verbrauch: number, index: number) => {
                  this.labels.push(
                    index > 0 ? `- ${index}h` : `${index}h`
                  )
                })
              this.analyse = analyse
              })
        }, 500
      )

      }
    )
  }

  changeTimeRange(range: number) {
    this.analyse = undefined;
    this.lineChartData.labels = [];
    this.lineChartData.datasets = [];
    this.analysisSubscription = this.userService.getAnalysis(range).subscribe(
      (analyse) => {
        analyse.steckdosen?.forEach((steckdose: Device, index:number) => {
          this.lineChartData.datasets.push({
            data: steckdose.Verbrauch!,
            label: steckdose.Bezeichnung,
            fill: true,
            tension: 0.5,
            borderColor: this.getColor(index),
            backgroundColor: 'rgba(54,255,0,0.3)'
          })
        })
        analyse.steckdosen[0]?.Verbrauch.forEach((verbrauch: number, index: number) => {
          this.lineChartData.labels!.push(
            index > 0 ? `- ${index}h` : `${index}h`
          )
        })
        this.analyse = analyse
      })
  }

  getColor(index: number): string {
    const colors = [
      "green",
      "black",
      "yellow",
      "cyan",
      "red",
      "white",
      "blue",
      "orange",
      "purple",
      "pink",
      "gray",
      "brown",
      "magenta"
    ];
    return colors[index];
  }

  public pickerColumns = [
    {
      name: 'tage',
      options: [
        {
          text: '1 Tag',
          value: 1,
        },
        {
          text: '2 Tage',
          value: 2,
        },
        {
          text: '3 Tage',
          value: 3,
        },
        {
          text: '4 Tage',
          value: 4,
        },
        {
          text: '5 Tage',
          value: 5,
        },
        {
          text: '6 Tage',
          value: 6,
        },
        {
          text: '7 Tage',
          value: 7,
        }
      ],
    },
  ];

  public pickerButtons = [
    {
      text: 'Abbrechen',
      role: 'cancel',
    },
    {
      text: 'Bestätigen',
      handler: (value: any) => {
        this.changeTimeRange(value.tage.value);
      },
    },
  ];

}
