import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SITE_NAME } from '../../shared/constants/site.constants';
import {
  featherGithub,
  featherInstagram,
  featherLinkedin,
  featherSend,
  featherTwitter,
} from '@ng-icons/feather-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
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
export class FooterComponent {
  readonly siteName = SITE_NAME;
}
