import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const LAYOUT_ROUTES: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'photos',
                loadComponent: () => import('../modules/photos/photos.component').then(
                    (c) => c.PhotosComponent
                )
            },
            {
                path: 'favourites',
                loadComponent: () => import('../modules/favourites/favourites.component').then(
                    (c) => c.FavouritesComponent
                )
            },
            {
                path: '**',
                redirectTo: 'photos'
            }
        ]
    }
];
