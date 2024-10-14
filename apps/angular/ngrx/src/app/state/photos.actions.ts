import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Photo } from '../modules/components/photos/photos.service';

export const PhotosActions = createActionGroup({
  source: 'Photos',
  events: {
    setItemsBeingFiltered: props<{ totals: number }>(),
    setFilteredPhotos: props<{ filteredPhotos: Photo[] }>(),
    filterPhotos: props<{ searchTerm: string }>(),
    loadMorePhotos: props<{ total: number }>(),
    loadMorePhotosSuccess: props<{ newPhotos: Photo[] }>(),
    loadMorePhotosFailure: emptyProps()
  },
});

