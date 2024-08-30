import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { AppStore } from '../../../app.store';
import { LoadMoreDirective } from '../../../shared/directives/load-more.directive';
import { FavouritesService } from '../favourites/favourites.service';
import { SearchComponent } from '../search/search.component';
import { Photo } from './photos.service';
import { PhotosStore } from './photos.store';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  standalone: true,
  imports: [NgOptimizedImage, LoadMoreDirective, SearchComponent],
  providers: [PhotosStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnInit {
  private readonly _appStore = inject(AppStore);
  private readonly _favouritesService = inject(FavouritesService);
  private readonly _destroy = inject(DestroyRef);
  readonly photosStore = inject(PhotosStore);

  ngOnInit(): void {
    this.loadMorePhotos();
    this._destroy.onDestroy(() => this._appStore.setPhotosTotals(0));
  }

  loadMorePhotos(totals = 20): void {
    this.photosStore.loadMore(totals);
  }

  addFavourite(photo: Photo): void {
    this._favouritesService.addToFavourites(photo);
  }

  filterPhotos(searchTerm: string): void {
    if (!searchTerm) {
      this.photosStore.setFilteredPhotos([...this.photosStore.$photos()]);
      this._appStore.setPhotosTotals(this.photosStore.$photos().length);
      return;
    }
    this.photosStore.setFilteredPhotos([
      ...this.photosStore
        .$photos()
        .filter((p: Photo) => p.id.includes(searchTerm)),
    ]);
    this.photosStore.setItemsBeingFiltered(
      this.photosStore.$filteredPhotos().length
    );
    this._appStore.setPhotosTotals(this.photosStore.$photos().length);
  }
}
