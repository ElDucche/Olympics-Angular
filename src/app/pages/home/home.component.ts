import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public olympics?: Olympic[];

  constructor(private olympicService: OlympicService, private cdk: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.olympicService.olympics$.subscribe((olympics) => {
      if(olympics) this.olympics = olympics;
      this.cdk.markForCheck();
    });
  }

  convertOlympicsToPieChartData(olympics: Olympic[]): PieChartDatas {
    const backgroundColors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)'
    ]
    let data: PieChartDatas = {
      labels: [],
      datasets: [
        {
          label: 'Gold medals',
          data: [],
          backgroundColor: backgroundColors,
          hoverOffset: 4
        }
      ]
    };

    if (this.olympics) {
      this.olympics.forEach((olympic) => {
        data.labels.push(olympic.country);
        data.datasets[0].data.push(olympic.participations.reduce((acc, curr) => acc + curr.medalsCount, 0));
      });
    }

    return data;
  }

  
}
