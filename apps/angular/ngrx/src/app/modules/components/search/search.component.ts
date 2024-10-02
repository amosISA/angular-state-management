import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import {
  selectFilteredPhotosAsString,
  selectItemsBeingFiltered,
} from '../../../state/photos.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly _store = inject(Store);
  search = signal('');
  searchTerm = outputFromObservable(
    toObservable(this.search).pipe(debounceTime(500), distinctUntilChanged())
  );

  get totalItemsFiltered$(): Observable<number> {
    return this._store.select(selectItemsBeingFiltered);
  }

  get stringFilteredPhotos$(): Observable<string> {
    return this._store.select(selectFilteredPhotosAsString);
  }
}
