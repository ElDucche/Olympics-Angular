<<<<<<< HEAD
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, OutletContext, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
=======
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, OutletContext, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { map, Observable, Subscription, take } from 'rxjs';
>>>>>>> 2fc57d7 (Refactor le composant Home et Detail : mise à jour de la gestion des données avec des Observables, amélioration de la logique de récupération des données et ajout de la gestion des états de chargement)
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
<<<<<<< HEAD
  imports: [NgxChartsModule, RouterModule]
=======
  imports: [NgxChartsModule, RouterModule],
  // changeDetection: ChangeDetectionStrategy.OnPush,
>>>>>>> 2fc57d7 (Refactor le composant Home et Detail : mise à jour de la gestion des données avec des Observables, amélioration de la logique de récupération des données et ajout de la gestion des états de chargement)
})
export class DetailComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  public countryName: string;
<<<<<<< HEAD
  public olympicData: any;
=======
  olympic$!: Observable<Olympic | undefined>;
  lineChartData$!: Observable<LineChartDatas[] | undefined>;
  totalMedals$!: Observable<number>;
  totalAthletes$!: Observable<number>;

  // Transformer tous mes appels aux méthodes en observable pour pipe | async
>>>>>>> 2fc57d7 (Refactor le composant Home et Detail : mise à jour de la gestion des données avec des Observables, amélioration de la logique de récupération des données et ajout de la gestion des états de chargement)

  view: [number, number] = [600, 400];

  private viewWidth!: number;
  private setViewWidth(): void {
    if (window.innerWidth < 576) {
      this.viewWidth = 300;
    } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
      this.viewWidth = 500;
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      this.viewWidth = 700;
    } else {
      this.viewWidth = 700;
    }
    this.view = [this.viewWidth, 400];
  }

<<<<<<< HEAD
  constructor(route: ActivatedRoute, private olympic$: OlympicService, private cdk: ChangeDetectorRef) {
=======
  constructor(
    route: ActivatedRoute,
    private olympicService: OlympicService
  ) // private cdk: ChangeDetectorRef
  {
>>>>>>> 2fc57d7 (Refactor le composant Home et Detail : mise à jour de la gestion des données avec des Observables, amélioration de la logique de récupération des données et ajout de la gestion des états de chargement)
    this.countryName = String(route.snapshot.params['name']).toLowerCase();
  }

  ngOnInit(): void {
    const formattedName = this.countryName.split('-').join(' ');
<<<<<<< HEAD
    console.log('Country name = ' + formattedName);
    this.subscription = this.olympic$.getOlympicByCountry(formattedName).subscribe((olympic) => {
      this.olympicData = olympic;
      console.log(this.olympicData);
    });
    this.cdk.markForCheck();
=======
    this.olympic$ = this.olympicService.getOlympicByCountry(formattedName);
    this.lineChartData$ = this.olympic$.pipe(
      map((olympic) => this.convertOlympicDataToLineChartData(olympic))
    );
    this.totalMedals$ = this.olympic$.pipe(
      map((olympic) => {
        return (
          olympic?.participations?.reduce(
            (acc: number, curr: any) => acc + curr.medalsCount,
            0
          ) || 0
        );
      })
    );
    this.totalAthletes$ = this.olympic$.pipe(
      map((olympic) => {
        return (
          olympic?.participations?.reduce(
            (acc: number, curr: any) => acc + curr.athleteCount,
            0
          ) || 0
        );
      })
    );
    // this.cdk.markForCheck();
>>>>>>> 2fc57d7 (Refactor le composant Home et Detail : mise à jour de la gestion des données avec des Observables, amélioration de la logique de récupération des données et ajout de la gestion des états de chargement)
    this.setViewWidth();
    window.addEventListener('resize', () => {
      this.setViewWidth();
      // this.cdk.markForCheck();
    });
  }

<<<<<<< HEAD
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTotalMedals(): number {
    return (
      this.olympicData?.participations?.reduce(
        (acc: number, curr: any) => acc + curr.medalsCount,
        0
      ) || 0
    );
  }

  getTotalNumberOfAthletes(): number {
    return (
      this.olympicData?.participations?.reduce(
        (acc: number, curr: any) => acc + curr.athleteCount,
        0
      ) || 0
    );
  }

  convertOlympicDataToLineChartData(olympicData: Olympic) : { name:string; series: {name: string; value: number}[]}[] {
    return [{
      name: olympicData.country,
      series: olympicData.participations.map((participation) => {
        return {
          name: String(participation.year),
          value: participation.medalsCount
        }
      })}
    ]
  }
}
=======
  convertOlympicDataToLineChartData(
    olympicData: Olympic | undefined
  ): { name: string; series: { name: string; value: number }[] }[] {
    return [
      {
        name: olympicData?.country || '',
        series:
          olympicData?.participations.map((participation) => {
            return {
              name: String(participation.year),
              value: participation.medalsCount,
            };
          }) || [],
      },
    ];
  }
}
>>>>>>> 2fc57d7 (Refactor le composant Home et Detail : mise à jour de la gestion des données avec des Observables, amélioration de la logique de récupération des données et ajout de la gestion des états de chargement)
