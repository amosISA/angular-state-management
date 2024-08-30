import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Photo } from '../photos/photos.service';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './photo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent {
  photo = input.required<Photo>();
}
