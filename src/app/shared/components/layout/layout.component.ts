import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  featherGithub,
  featherInstagram,
  featherLinkedin,
  featherSend,
  featherTwitter,
} from '@ng-icons/feather-icons';
import { HomeComponent } from '../../../components/home/home.component';
import { AboutComponent } from '../../../components/about/about.component';
import { ExperienceComponent } from '../../../components/experience/experience.component';
import { ProjectsComponent } from '../../../components/projects/projects.component';
import { ContactComponent } from '../../../components/contact/contact.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    NgIcon,
  ],
  providers: [
    provideIcons({
      featherGithub,
      featherLinkedin,
      featherSend,
      featherInstagram,
      featherTwitter,
    }),
  ],
})
export class LayoutComponent {}
