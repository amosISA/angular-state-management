import { createAction, props } from '@ngrx/store';
import { Photo } from '../modules/components/photos/photos.service';

export const setItemsBeingFiltered = createAction(
  '[Photos] Set Items Being Filtered',
  props<{ totals: number }>()
);

export const setFilteredPhotos = createAction(
  '[Photos] Set Filtered Photos',
  props<{ filteredPhotos: Photo[] }>()
);

export const filterPhotos = createAction(
  '[Photos] Filter Photos',
  props<{ searchTerm: string }>()
);

export const loadMorePhotos = createAction(
  '[Photos] Load More Photos',
  props<{ total: number }>()
);

export const loadMorePhotosSuccess = createAction(
  '[Photos] Load More Photos Success',
  props<{ newPhotos: Photo[] }>()
);

export const loadMorePhotosFailure = createAction(
  '[Photos] Load More Photos Failure'
);
