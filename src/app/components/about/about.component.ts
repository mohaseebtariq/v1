import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ContentfulService } from '../../shared/services/contentful.service';
import { SEO_EXTRA_SKILLS } from '../../shared/constants/site.constants';
import { MdToHtmlPipe } from '../../shared/pipes/md-to-html.pipe';
import { ImageComponent } from '../../shared/components/image/image.component';
import { ContentSkeletonComponent } from '../../shared/components/content-skeleton/content-skeleton.component';
import { SectionComponent } from '../../shared/components/section/section.component';
import type { AboutEntry } from '../../shared/models/contentful.models';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MdToHtmlPipe, ImageComponent, ContentSkeletonComponent, SectionComponent],
})
export class AboutComponent {
  private readonly contentful = inject(ContentfulService);

  readonly aboutResource = rxResource({
    stream: () => this.contentful.getAbout(),
  });

  readonly imageResource = rxResource({
    stream: () => this.contentful.getImage(),
  });

  readonly skills = computed(() => {
    const about = this.aboutResource.value() as AboutEntry[] | undefined;
    if (!about?.length) {
      return [];
    }

    const merged = about.flatMap((item) => item.skills ?? []);
    return [...new Set([...merged, ...SEO_EXTRA_SKILLS])];
  });
}
