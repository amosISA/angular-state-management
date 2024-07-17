import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FavouritesService } from './favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  standalone: true,
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent {
  private readonly _favouritesService = inject(FavouritesService);  

  favourites = toSignal(
    this._favouritesService.getFavourites()
  );

  removeFavourite(photoId: string): void {
    this._favouritesService.removeFromFavourites(photoId);
  }
}
