import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStore {
  private readonly _state = {
    $totalPhotos: signal(0),
    $totalFavourites: signal(0),
  };

  readonly $totalPhotos = this._state.$totalPhotos.asReadonly();
  readonly $totalFavourites = this._state.$totalFavourites.asReadonly();

  setPhotosTotals(totals: number): void {
    this._state.$totalPhotos.set(totals);
  }

  setFavouritesTotals(totals: number): void {
    this._state.$totalFavourites.set(totals);
  }
}
