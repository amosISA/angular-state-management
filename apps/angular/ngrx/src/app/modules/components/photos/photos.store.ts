import { inject, Injectable, signal } from '@angular/core';
import { createEffect } from 'ngxtension/create-effect';
import { concatMap, finalize, Observable, tap } from 'rxjs';
import { AppStore } from '../../../app.store';
import { Photo, PhotosService } from './photos.service';

@Injectable()
export class PhotosStore {
  private readonly _photosService = inject(PhotosService);
  private readonly _appStore = inject(AppStore);

  private readonly _state = {
    $itemsBeingFiltered: signal(0),
    $photos: signal<Photo[]>([]),
    $filteredPhotos: signal<Photo[]>([]),
    $isLoading: signal(false),
  };

  readonly $itemsBeingFiltered = this._state.$itemsBeingFiltered.asReadonly();
  readonly $photos = this._state.$photos.asReadonly();
  readonly $filteredPhotos = this._state.$filteredPhotos.asReadonly();
  readonly $isLoading = this._state.$isLoading.asReadonly();

  setItemsBeingFiltered(totals: number): void {
    this._state.$itemsBeingFiltered.set(totals);
  }

  setPhotos(photos: Photo[]): void {
    this._state.$photos.set(photos);
  }

  setFilteredPhotos(filteredPhotos: Photo[]): void {
    this._state.$filteredPhotos.set(filteredPhotos);
  }

  setIsLoading(isLoading: boolean): void {
    this._state.$isLoading.set(isLoading);
  }

  public readonly loadMore = createEffect((totalPhotos: Observable<number>) =>
    totalPhotos.pipe(
      tap(() => this.setIsLoading(true)),
      concatMap((total: number) => {
        return this._photosService.getRandomPhotos(total).pipe(
          tap((newPhotos: Photo[]) => {
            this.setPhotos([...this._state.$photos(), ...newPhotos]);
            this.setFilteredPhotos([...this._state.$photos()]);
            this._appStore.setPhotosTotals(this._state.$photos().length);
          }),
          finalize(() => this.setIsLoading(false))
        );
      })
    )
  );
}
