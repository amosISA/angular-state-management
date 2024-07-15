import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface HeaderItem {
  text: string;
  url: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  headerItems: WritableSignal<HeaderItem[]> = signal([
    { text: 'Photos', url: 'photos' },
    { text: 'Favourites', url: 'favourites' }
  ]);
}
