import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Photo } from '../modules/components/photos/photos.service';

export const PhotosActions = createActionGroup({
  source: 'Photos',
  events: {
    'Set Items Being Filtered': props<{ totals: number }>(),
    'Set Filtered Photos': props<{ filteredPhotos: Photo[] }>(),
    'Filter Photos': props<{ searchTerm: string }>(),
    'Load More Photos': props<{ total: number }>(),
    'Load More Photos Success': props<{ newPhotos: Photo[] }>(),
    'Load More Photos Failure': emptyProps()
  },
});
