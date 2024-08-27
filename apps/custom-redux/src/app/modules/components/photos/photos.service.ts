import { inject, Injectable } from '@angular/core';
import { API_URL } from 'apps/custom-redux/src/app/core/core.provider';
import { delay, Observable, of } from 'rxjs';

export interface Photo {
  id: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private readonly _apiUrl: string = inject(API_URL);

  getRandomPhotos(count = 50): Observable<Photo[]> {
    return of(
      Array.from({ length: count }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        url: `${this._apiUrl}?random=${Date.now()}-${i}`,
      }))
    ).pipe(delay(Math.random() * 100 + 200));
  }
}
