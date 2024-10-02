import { createReducer, on } from "@ngrx/store";
import { Photo } from "../modules/components/photos/photos.service";
import { PhotosActions } from "./photos.actions";

export const photosFeatureKey = 'photos';

export interface PhotosState {
  itemsBeingFiltered: number;
  photos: Photo[];
  filteredPhotos: Photo[];
  isLoading: boolean;
}

export const initialState: PhotosState = {
  itemsBeingFiltered: 0,
  photos: [],
  filteredPhotos: [],
  isLoading: true,
};

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
