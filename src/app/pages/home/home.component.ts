import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { Olympic } from 'src/app/core/models/Olympic';
import { PieChartDatas } from 'src/app/core/models/PieChartDatas';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';

interface PieChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[] | undefined>;
  pieChartData$!: Observable<PieChartData[]>;

  view: [number, number] = [600, 400];

  }

  constructor(
    private cdk: ChangeDetectorRef,
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.olympics$
    this.pieChartData$ = this.olympics$
      .pipe(
        map((olympics) => this.convertOlympicsToPieChartData(olympics)),
      ) 
    this.setViewWidth();
    window.addEventListener('resize', () => {
      this.setViewWidth();
      this.cdk.markForCheck();
    });
  }

  convertOlympicsToPieChartData(
    olympics: Olympic[] | undefined
  ): PieChartData[] {
    const data: { name: string; value: number }[] = [];

    if (this.olympics) {
      this.olympics.forEach((olympic) => {
        data.push({
          name: olympic.country,
          value: olympic.participations.reduce(
            (acc, curr) => acc + curr.medalsCount,
            0
          ),
        });
      });
    }

    return data;
  }
  colorScheme : { domain : Array<string> }= {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onSelect(data: any): void {
    const { name } = JSON.parse(JSON.stringify(data));
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    const slug = name.split(' ').join('-').toLowerCase();
    this.router.navigate([`/details/${slug}`]);
  }

}
