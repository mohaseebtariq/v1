import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

function normalizeImageUrl(url: string): string {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  return url;
}

import { SITE_NAME } from '../../constants/site.constants';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class ImageComponent {
  readonly siteName = SITE_NAME;

  readonly imageUrl = input.required<string>();
  readonly imageWidth = input(300);
  readonly imageHeight = input(300);
  readonly priority = input(false);

  readonly resolvedImageUrl = computed(() =>
    normalizeImageUrl(this.imageUrl()),
  );
}
