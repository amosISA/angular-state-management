import { createFeatureSelector, createSelector } from "@ngrx/store";
import { appFeatureKey, AppState } from "./app.reducer";

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);

export const selectTotalPhotos = createSelector(
  selectAppState,
  (state: AppState) => state.totalPhotos
);

export const selectTotalFavourites = createSelector(
  selectAppState,
  (state: AppState) => state.totalFavourites
);
