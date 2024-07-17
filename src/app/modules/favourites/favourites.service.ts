import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo } from '../photos/photos.service';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private _favouritesSubject$ = new BehaviorSubject<Photo[]>([]);
  private _favourites: Photo[] = [];

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
    }
  }

  removeFromFavourites(photoId: string): void {
    this._favourites = this._favourites.filter((p: Photo) => p.id !== photoId);
    this._saveFavourites();
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
    }
  }
}
