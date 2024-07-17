import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadMoreDirective } from 'src/app/shared/directives/load-more.directive';
import { FavouritesService } from '../favourites/favourites.service';
import { Photo, PhotosService } from './photos.service';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [NgOptimizedImage, LoadMoreDirective],
  templateUrl: './photos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnInit {
  photos = signal<Photo[]>([]);
  isLoading = signal(false);

  private readonly _photosService = inject(PhotosService);
  private readonly _favouritesService = inject(FavouritesService);
  private readonly _destroy = inject(DestroyRef);

  ngOnInit(): void {
    this.loadMorePhotos();
  }

  addFavourite(photo: Photo): void {
    this._favouritesService.addToFavourites(photo);
    this.photos.set([...this.photos().filter((p: Photo) => p.id !== photo.id)]);
  }

  loadMorePhotos(photos = 50): void {
    this.isLoading.set(true);
    this._photosService.getRandomPhotos(photos).pipe(
      takeUntilDestroyed(this._destroy)
    ).subscribe({
      next: (newPhotos: Photo[]) => {
        this.photos.set([...this.photos(), ...newPhotos]);
        this.isLoading.set(false);
      }
    });
  }
}
