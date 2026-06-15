import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  JOB_TITLE,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from '../constants/site.constants';
import type { PortfolioContent } from '../models/contentful.models';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);

  syncMetaTags(content: PortfolioContent): void {
    const description = this.buildDescription(content);
    const profileImage = this.resolveProfileImage(content);
    const pageTitle = `${SITE_NAME} | ${JOB_TITLE}`;

    this.title.setTitle(pageTitle);
    this.updateCanonical(`${SITE_URL}/`);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: SEO_KEYWORDS });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: `${SITE_URL}/` });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:image', content: profileImage });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: profileImage });
  }

  setNotFoundMeta(): void {
    const pageTitle = `Page Not Found | ${SITE_NAME}`;
    const description = `The page you requested was not found on ${SITE_NAME}'s portfolio.`;

    this.title.setTitle(pageTitle);
    this.updateCanonical(`${SITE_URL}/404`);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

  private buildDescription(_content: PortfolioContent): string {
    return SEO_DESCRIPTION;
  }

  private resolveProfileImage(content: PortfolioContent): string {
    const url = content.image[0]?.profileImg?.fields?.file?.url;
    if (!url) {
      return `${SITE_URL}/assets/images/ht.svg`;
    }
    return url.startsWith('http') ? url : `https:${url}`;
  }

  private updateCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
