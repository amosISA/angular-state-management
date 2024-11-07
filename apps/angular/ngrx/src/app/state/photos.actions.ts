import { createActionGroup, props } from '@ngrx/store';
import { Photo } from '../modules/components/photos/photos.service';

export const PhotosActions = createActionGroup({
  source: 'Photos',
  events: {
    loadMorePhotos: props<{ total: number }>(),
    setItemsBeingFiltered: props<{ totals: number }>(),
    setFilteredPhotos: props<{ filteredPhotos: Photo[] }>(),
    filterPhotos: props<{ searchTerm: string }>(),
    selectePhoto: props<{ photo: Photo }>(),
    deletePhoto: props<{ id: string }>(),
  },
});

