import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';
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
  public olympics?: Olympic[];
  view : [number, number] = [700, 400];

  constructor(
    private olympicService: OlympicService,
    private cdk: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.olympicService.olympics$.subscribe((olympics) => {
      if (olympics) this.olympics = olympics;
      this.cdk.markForCheck();
    });
  }

  convertOlympicsToPieChartData(
    olympics: Olympic[]
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
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
