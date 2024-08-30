import { Route } from '@angular/router';
import { photoResolver } from '../modules/resolvers/photo.resolver';
import { LayoutComponent } from './layout.component';

export const LAYOUT_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'photos',
        loadComponent: () =>
          import('../modules/components/photos/photos.component').then(
            (c) => c.PhotosComponent
          ),
      },
      {
        path: 'photos/:id',
        loadComponent: () =>
          import('../modules/components/photo/photo.component').then(
            (c) => c.PhotoComponent
          ),
        resolve: {
          photo: photoResolver,
        },
      },
      {
        path: 'favourites',
        loadComponent: () =>
          import('../modules/components/favourites/favourites.component').then(
            (c) => c.FavouritesComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'photos',
      },
    ],
  },
];
