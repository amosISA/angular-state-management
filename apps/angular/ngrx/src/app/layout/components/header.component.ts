import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateTotalFavourites, updateTotalPhotos } from '../../state/app.actions';
import { selectTotalFavourites, selectTotalPhotos } from '../../state/app.selectors';

export interface HeaderItem {
  id: number;
  text: string;
  url: string;
  totals: Signal<number | undefined>;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly _appStore = inject(Store);
  headerItems = signal<HeaderItem[]>([
    {
      id: 1,
      text: 'Photos',
      url: 'photos',
      totals: toSignal(this._appStore.select(selectTotalPhotos))
    },
    {
      id: 2,
      text: 'Favourites',
      url: 'favourites',
      totals: toSignal(this._appStore.select(selectTotalFavourites))
    },
  ]);

  constructor() {
    this._appStore.dispatch(updateTotalPhotos({ totalPhotos: 0 }));
    this._appStore.dispatch(updateTotalFavourites({ totalFavourites: 0 }));
  }
}
