
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public olympics?: Olympic[];
  
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
    private cdk: ChangeDetectorRef,
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.olympicService.olympics$.subscribe((olympics) => {
      if (olympics) this.olympics = olympics;
      this.cdk.markForCheck();
    });
    this.setViewWidth();
    window.addEventListener('resize', () => {
      this.setViewWidth();
      this.cdk.markForCheck();
    });
  }

  convertOlympicsToPieChartData(
  ): { name: string; value: number }[] {
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
