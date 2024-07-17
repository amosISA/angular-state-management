import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

}