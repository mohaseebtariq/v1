import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  readonly sectionId = input.required<string>();
  readonly heading = input.required<string>();
  readonly headingId = input<string>();
  readonly sectionClass = input('');
  readonly ariaBusy = input<boolean | undefined>(undefined);

  readonly resolvedHeadingId = computed(
    () => this.headingId() ?? `${this.sectionId()}-heading`,
  );
}
