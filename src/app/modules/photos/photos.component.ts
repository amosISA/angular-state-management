import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadMoreDirective } from 'src/app/shared/load-more.directive';
import { Photo, PhotosService } from './photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  standalone: true,
  imports: [NgOptimizedImage, LoadMoreDirective],
  styles: `
    :host { margin: 10px; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnInit {
  photos = signal<Photo[]>([]);
  isLoading = signal(false);

  private readonly _photosService = inject(PhotosService);
  private readonly _destroy = inject(DestroyRef);

  ngOnInit(): void {
    this.loadMorePhotos();
  }

  loadMorePhotos(photos = 50): void {
    this.isLoading.set(true);
    this._photosService.getRandomPhotos(photos).pipe(
      takeUntilDestroyed(this._destroy)
    ).subscribe({
      next: (newPhotos: Photo[]) => {
        this.photos.set([...this.photos(), ...newPhotos]);
        this.isLoading.set(false);
      },
      error: err => {
        window.console.log('Error fetching photos', err);
        this.isLoading.set(false);
      }
    })
  }
}
