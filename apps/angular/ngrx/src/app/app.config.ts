import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { provideCore } from './core/core.provider';
import { appFeatureKey, appReducer } from './state/app.reducer';
import { PhotosEffects } from './state/photos.effects';
import { photosFeature } from './state/photos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(PhotosEffects),
    provideStore({ [appFeatureKey]: appReducer }),
    provideState(photosFeature),
    provideStoreDevtools({
      logOnly: !isDevMode(),
      connectInZone: true,
      maxAge: 25
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withComponentInputBinding()
    ),
    provideCore(),
  ],
};
