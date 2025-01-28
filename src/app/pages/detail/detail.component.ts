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
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

interface LineChartDatas {
  name: string;
  series: { name: string; value: number }[];
}

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  imports: [NgxChartsModule, RouterModule],
})
export class DetailComponent implements OnInit {
  public countryName: string;
  olympic$!: Observable<Olympic | undefined>;
  lineChartData$!: Observable<LineChartDatas[] | undefined>;
  totalMedals$!: Observable<number>;
  totalAthletes$!: Observable<number>;

  // Transformer tous mes appels aux méthodes en observable pour pipe | async

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

  constructor(
    route: ActivatedRoute,
    private olympic$: OlympicService,
    private cdk: ChangeDetectorRef
  ) {
    this.countryName = String(route.snapshot.params['name']).toLowerCase();
  }

  ngOnInit(): void {
    console.log('Initialisation du composant');
    const formattedName = this.countryName.split('-').join(' ');
    console.log('Country name = ' + formattedName);
    this.subscription = this.olympic$
      .getOlympicByCountry(formattedName)
      .subscribe((olympic) => {
        this.olympicData = olympic;
        console.log(this.olympicData);
      });
    this.cdk.markForCheck();
    this.setViewWidth();
    window.addEventListener('resize', () => {
      this.setViewWidth();
      this.cdk.markForCheck();
    });
  }

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

  // Ajouter ces méthodes
  getYAxisMin(): number {
    if (!this.olympicData) return 0;
    const minValue = Math.min(
      ...this.olympicData.participations.map((p: Participation) => p.medalsCount)
    );
    return minValue - 10;
  }

  getYAxisMax(): number {
    if (!this.olympicData) return 100;
    const maxValue = Math.max(
      ...this.olympicData.participations.map((p : Participation) => p.medalsCount)
    );
    return maxValue + 10;
  }

  convertOlympicDataToLineChartData(
    olympicData: Olympic
  ): { name: string; series: { name: string; value: number }[] }[] {
    return [
      {
        name: olympicData.country,
        series: olympicData.participations.map((participation) => {
          return {
            name: String(participation.year),
            value: participation.medalsCount,
          };
        }),
      },
    ];
  }
}
