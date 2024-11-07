import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { Photo } from "../modules/components/photos/photos.service";
import { PhotosActions } from "./photos.actions";

export const photosFeatureKey = 'photos';

export type PhotosState = {
  selectedPhoto: Photo | undefined;
  itemsBeingFiltered: number;
  photos: Photo[];
  filteredPhotos: Photo[];
  isLoading: boolean;
  error: string | undefined;
} & EntityState<PhotosState>;

const adapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export const initialState = adapter.getInitialState({
  selectedPhoto: undefined,
  itemsBeingFiltered: 0,
  photos: [],
  filteredPhotos: [],
  isLoading: true,
  error: undefined
});

export const photosReducer = createReducer(
  initialState,
  on(PhotosActions.setItemsBeingFiltered, (state, { totals }) => ({
    ...state,
    itemsBeingFiltered: totals,
  })),
  on(PhotosActions.setFilteredPhotos, (state, { filteredPhotos }) => ({
    ...state,
    filteredPhotos,
  })),
  on(PhotosActions.filterPhotos, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PhotosActions.loadMorePhotos, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PhotosActions.loadMorePhotosSuccess, (state, { newPhotos }) => {
    const updatedPhotos = [...state.photos, ...newPhotos];
    return {
      ...state,
      photos: updatedPhotos,
      filteredPhotos: updatedPhotos,
      isLoading: false,
    };
  }),
  on(PhotosActions.loadMorePhotosFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export const photosFeature = createFeature({
  name: photosFeatureKey,
  reducer: photosReducer,
  extraSelectors: ({ selectFilteredPhotos, selectPhotos }) => ({
    selectFilteredPhotosAsString: createSelector(
      selectFilteredPhotos,
      selectPhotos,
      (photos: Photo[], total: Photo[]) =>
        `Found: ${photos.map((photo) => photo.id)
          .join(', ')} from a total of ${total.length}`
    )
  })
});
