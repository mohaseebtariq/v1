import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { provideIcons } from '@ng-icons/core';
import {
  featherExternalLink,
  featherFolder,
  featherGithub,
  featherInstagram,
  featherLinkedin,
  featherSend,
  featherTwitter,
} from '@ng-icons/feather-icons';
import { routes } from './app.routes';
import { providePortfolioInitializer } from './shared/providers/portfolio-initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideAnimations(),
    provideClientHydration(),
    providePortfolioInitializer(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideIcons({
      featherGithub,
      featherLinkedin,
      featherSend,
      featherInstagram,
      featherTwitter,
      featherFolder,
      featherExternalLink,
    }),
  ],
};
