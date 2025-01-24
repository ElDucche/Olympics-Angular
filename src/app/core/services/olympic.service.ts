import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private _olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this._olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this._olympics$.next(null);
        return caught;
      })
    );
  }

  get olympics$() : Observable<Olympic[] | null> {
    return this._olympics$.asObservable();
  }

  getOlympicByCountry(country: string): Observable<Olympic | null> {
    return this._olympics$.pipe(
      map((olympics) => {
        if (olympics) {
          return olympics.find(
            (olympic) => olympic.country.toLowerCase() === country
          ) || null;
        }
        return null;
      }),
      catchError((error, caught) => { 
        console.error(error);
        return caught;
      })
    );
  }
}
