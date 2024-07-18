import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { outputFromObservable, toObservable } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  search = signal('');
  searchTerm = outputFromObservable(
    toObservable(this.search).pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
  );
}