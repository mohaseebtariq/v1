import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ContentSkeletonVariant = 'text' | 'about' | 'experience' | 'projects';

@Component({
  selector: 'app-content-skeleton',
  templateUrl: './content-skeleton.component.html',
  styleUrls: ['./content-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentSkeletonComponent {
  readonly variant = input<ContentSkeletonVariant>('text');
  readonly label = input('Loading content');
}
