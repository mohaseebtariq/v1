import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ContentfulService } from '../../shared/services/contentful.service';
import { ContentSkeletonComponent } from '../../shared/components/content-skeleton/content-skeleton.component';
import { JOB_TITLE, SITE_NAME } from '../../shared/constants/site.constants';
import {
  resolveResumeLink,
} from '../../shared/utils/contentful-asset.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContentSkeletonComponent],
})
export class HomeComponent {
  private readonly contentful = inject(ContentfulService);

  readonly headlineResource = rxResource({
    stream: () => this.contentful.getHeadline(),
  });

  readonly resumeResource = rxResource({
    stream: () => this.contentful.getResume(),
  });

  readonly resumeLink = resolveResumeLink;

  readonly jobTitle = JOB_TITLE;

  readonly siteName = SITE_NAME;
}
