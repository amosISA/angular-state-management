import { createReducer, on } from "@ngrx/store";
import { Photo } from "../modules/components/photos/photos.service";
import { filterPhotos, loadMorePhotos, loadMorePhotosFailure, loadMorePhotosSuccess, setFilteredPhotos, setItemsBeingFiltered } from "./photos.actions";

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
  on(setItemsBeingFiltered, (state, { totals }) => ({
    ...state,
    itemsBeingFiltered: totals,
  })),
  on(setFilteredPhotos, (state, { filteredPhotos }) => ({
    ...state,
    filteredPhotos,
  })),
  on(filterPhotos, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadMorePhotos, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadMorePhotosSuccess, (state, { newPhotos }) => {
    const updatedPhotos = [...state.photos, ...newPhotos];
    return {
      ...state,
      photos: updatedPhotos,
      filteredPhotos: updatedPhotos,
      isLoading: false,
    };
  }),
  on(loadMorePhotosFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);
