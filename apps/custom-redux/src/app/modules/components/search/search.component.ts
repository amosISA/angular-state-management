import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PhotosStore } from '../photos/photos.store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly _photosStore = inject(PhotosStore);
  search = signal('');
  searchTerm = outputFromObservable(
    toObservable(this.search).pipe(debounceTime(500), distinctUntilChanged())
  );

  get totalItemsFilteres(): number {
    return this._photosStore.$itemsBeingFiltered();
  }
}
