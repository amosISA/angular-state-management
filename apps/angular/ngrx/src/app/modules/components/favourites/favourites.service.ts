import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { updateTotalFavourites } from '../../../state/app.actions';
import { Photo } from '../photos/photos.service';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private _favouritesSubject$ = new BehaviorSubject<Photo[]>([]);
  private _favourites: Photo[] = [];

  private readonly _appStore = inject(Store);

  constructor() {
    this._loadFavourites();
  }

  getFavourites(): Observable<Photo[]> {
    return this._favouritesSubject$.asObservable();
  }

  getFavourite(photoId: string): Photo | undefined {
    return this._favourites.find((photo: Photo) => photo.id === photoId);
  }

  addToFavourites(photo: Photo): void {
    if (!this._favourites.some((p: Photo) => p.id === photo.id)) {
      this._favourites.push(photo);
      this._saveFavourites();
      this._appStore.dispatch(updateTotalFavourites({ totalFavourites: this._favourites.length }));
    }
  }

  removeFromFavourites(photoId: string): void {
    this._favourites = this._favourites.filter((p: Photo) => p.id !== photoId);
    this._saveFavourites();
    this._appStore.dispatch(updateTotalFavourites({ totalFavourites: this._favourites.length }));
  }

  private _saveFavourites(): void {
    localStorage.setItem('favourites', JSON.stringify(this._favourites));
    this._favouritesSubject$.next(this._favourites);
  }

  private _loadFavourites(): void {
    const storedFavourites = localStorage.getItem('favourites');
    if (storedFavourites) {
      this._favourites = JSON.parse(storedFavourites);
      this._favouritesSubject$.next(this._favourites);
      this._appStore.dispatch(updateTotalFavourites({ totalFavourites: this._favourites.length }));
    }
  }
}
