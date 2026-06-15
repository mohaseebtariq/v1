import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_NAME } from '../../shared/constants/site.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly siteName = SITE_NAME;
}
