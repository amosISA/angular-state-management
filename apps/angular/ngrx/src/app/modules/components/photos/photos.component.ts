import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadMoreDirective } from '../../../shared/directives/load-more.directive';
import { filterPhotos, loadMorePhotos } from '../../../state/photos.actions';
import { selectFilteredPhotos, selectIsLoading } from '../../../state/photos.selectors';
import { FavouritesService } from '../favourites/favourites.service';
import { SearchComponent } from '../search/search.component';
import { Photo } from './photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, LoadMoreDirective, SearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _favouritesService = inject(FavouritesService);

  get filteredPhotos$(): Observable<Photo[]> {
    return this._store.select(selectFilteredPhotos);
  }

  get isLoading$(): Observable<boolean> {
    return this._store.select(selectIsLoading);
  }

  ngOnInit(): void {
    this.loadMorePhotos();
  }

  loadMorePhotos(totals = 20): void {
    this._store.dispatch(loadMorePhotos({ total: totals }));
  }

  addFavourite(photo: Photo): void {
    this._favouritesService.addToFavourites(photo);
  }

  filterPhotos(searchTerm: string): void {
    this._store.dispatch(filterPhotos({ searchTerm }));
  }
}
