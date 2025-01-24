import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Olympic } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule, NgxChartsModule],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  countryName: string;
  olympicData?: Olympic | null;

  constructor(route: ActivatedRoute, private olympic$: OlympicService) {
    this.countryName = String(route.snapshot.params['name']).toLowerCase();
  }

  ngOnInit(): void {
    this.countryName.split('-').join(' ');
    this.olympic$.getOlympicByCountry(this.countryName).subscribe((olympic) => {
      this.olympicData = olympic;
      console.log(this.olympicData);
    });
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

  convertOlympicDataToLineChartData(olympicData: Olympic): {name: string; series: { name: string; value: number }[]}[] {
    return [{
      name: this.countryName,
      series: olympicData.participations.map((participation: Participation) => {
        return {
          name: participation.year.toString(),
          value: participation.medalsCount,
        };
      })
    }];
  }
}
