import { createReducer, on } from '@ngrx/store';
import { updateTotalFavourites, updateTotalPhotos } from './app.actions';

export const appFeatureKey = 'appState';

export interface AppState {
  totalPhotos: number;
  totalFavourites: number;
}

const initialAppState: AppState = {
  totalPhotos: 0,
  totalFavourites: 0,
};

export const appReducer = createReducer(
  initialAppState,
  on(updateTotalPhotos, (state, { totalPhotos }) => ({...state, totalPhotos})),
  on(updateTotalFavourites, (state, { totalFavourites }) => ({...state, totalFavourites})),
);
