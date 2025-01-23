import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Olympic } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html'
})
export class DetailComponent {
  route : ActivatedRoute = inject(ActivatedRoute);
  countryName : string;
  // olympicData : Olympic;

  constructor(route: ActivatedRoute, private olympic$: OlympicService) {
    this.countryName = String(route.snapshot.params['name']).toLowerCase()
  }
}
