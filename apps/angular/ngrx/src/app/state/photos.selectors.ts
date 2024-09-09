import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhotosState } from './photos.reducer';

export const selectPhotosState = createFeatureSelector<PhotosState>('photos');

export const selectAllPhotos = createSelector(
  selectPhotosState,
  (state: PhotosState) => state.photos
);

export const selectFilteredPhotos = createSelector(
  selectPhotosState,
  (state: PhotosState) => state.filteredPhotos
);

export const selectItemsBeingFiltered = createSelector(
  selectPhotosState,
  (state: PhotosState) => state.itemsBeingFiltered
);

export const selectIsLoading = createSelector(
  selectPhotosState,
  (state: PhotosState) => state.isLoading
);
