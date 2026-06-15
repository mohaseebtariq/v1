import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  featherExternalLink,
  featherFolder,
  featherGithub,
} from '@ng-icons/feather-icons';
import { ContentfulService } from '../../shared/services/contentful.service';
import { ContentSkeletonComponent } from '../../shared/components/content-skeleton/content-skeleton.component';
import { SectionComponent } from '../../shared/components/section/section.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, ContentSkeletonComponent, SectionComponent],
  providers: [
    provideIcons({
      featherFolder,
      featherExternalLink,
      featherGithub,
    }),
  ],
})
export class ProjectsComponent {
  private readonly contentful = inject(ContentfulService);

  readonly projectsResource = rxResource({
    stream: () => this.contentful.getProjects(),
  });
}
