import { createAction, props } from '@ngrx/store';

export const updateTotalPhotos = createAction(
  '[APP] Update total Photos',
  props<{ totalPhotos: number }>()
);

export const updateTotalFavourites = createAction(
  '[APP] Update total Favourites',
  props<{ totalFavourites: number }>()
);
