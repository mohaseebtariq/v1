import { inject } from '@angular/core';
import { provideAppInitializer } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContentfulService } from '../services/contentful.service';
import { SeoService } from '../services/seo.service';
import { StructuredDataService } from '../services/structured-data.service';

export function providePortfolioInitializer() {
  return provideAppInitializer(() => {
    const contentful = inject(ContentfulService);
    const seo = inject(SeoService);
    const structuredData = inject(StructuredDataService);
    const router = inject(Router);

    return firstValueFrom(
      contentful.prefetchAll().pipe(
        tap((content) => {
          const isNotFoundRoute = router.url === '/404';

          if (isNotFoundRoute) {
            structuredData.setNotFoundGraph();
            seo.setNotFoundMeta();
            return;
          }

          structuredData.setPersonGraph(content);
          seo.syncMetaTags(content);
        }),
      ),
    );
  });
}
