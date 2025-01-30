import {
  Component,
  OnInit,
} from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { map, Observable, take, tap } from 'rxjs';

interface PieChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public olympics!: Olympic[];
  pieChartData$!: Observable<PieChartData[]>;

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
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.pieChartData$ = this.olympicService.olympics$
      .pipe(
        map((olympics) => this.convertOlympicsToPieChartData(olympics))
      )
    this.olympicService.olympics$.subscribe((olympics) => {
      this.olympics = olympics || [];
    });
    this.setViewWidth();
    window.addEventListener('resize', () => {
      this.setViewWidth();
    });
  }

  convertOlympicsToPieChartData(
    olympics: Olympic[] | null
  ): PieChartData[] {
    const data: { name: string; value: number }[] = [];
      olympics?.forEach((olympic) => {
        data.push({
          name: olympic.country,
          value: olympic.participations.reduce(
            (acc, curr) => acc + curr.medalsCount,
            0
          ),
        });
      });
    return data;
  }

  onSelect(data: any): void {
    const { name } = JSON.parse(JSON.stringify(data));
    const slug = name.split(' ').join('-').toLowerCase();
    this.router.navigate([`/details/${slug}`]);
  }
}
