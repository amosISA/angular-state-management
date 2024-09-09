import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from "@ngrx/store";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";
import { Photo, PhotosService } from "../modules/components/photos/photos.service";
import { updateTotalPhotos } from "./app.actions";
import { filterPhotos, loadMorePhotos, loadMorePhotosFailure, loadMorePhotosSuccess, setFilteredPhotos, setItemsBeingFiltered } from "./photos.actions";
import { selectAllPhotos } from "./photos.selectors";

@Injectable()
export class PhotosEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _photosService = inject(PhotosService);
  private readonly _store = inject(Store);

  readonly loadMorePhotos$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadMorePhotos),
      concatLatestFrom(() => this._store.select(selectAllPhotos)),
      concatMap(([action, photos]) => {
        const { total } = action;
        return this._photosService.getRandomPhotos(total).pipe(
          map((newPhotos: Photo[]) => {
            return [
              loadMorePhotosSuccess({ newPhotos }),
              updateTotalPhotos({ totalPhotos: photos.length + newPhotos.length })
            ];
          }),
          mergeMap(actions => actions)
        );
      }),
      catchError(() => of(loadMorePhotosFailure))
    )
  });

  readonly filterPhotos$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(filterPhotos),
      concatLatestFrom(() => this._store.select(selectAllPhotos)),
      map(([action, photos]) => {
        const { searchTerm } = action;
        if (!searchTerm) {
          return [setFilteredPhotos({ filteredPhotos: photos })];
        }

        const filteredPhotos = photos.filter((p: Photo) => p.id.includes(searchTerm));
        return [
          setFilteredPhotos({ filteredPhotos }),
          setItemsBeingFiltered({ totals: filterPhotos.length }),
          updateTotalPhotos({ totalPhotos: photos.length })
        ];
      }),
      mergeMap(actions => actions)
    )
  });
}
