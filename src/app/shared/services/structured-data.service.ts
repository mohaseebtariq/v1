import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import {
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  EMAIL,
  JOB_TITLE,
  RESUME_URL,
  SAME_AS,
  LEGAL_NAME,
  SEO_DESCRIPTION,
  SEO_EXTRA_SKILLS,
  SITE_NAME,
  SITE_URL,
} from '../constants/site.constants';
import type { PortfolioContent } from '../models/contentful.models';
import type {
  ImageObjectSchema,
  PersonSchema,
  SchemaGraph,
} from '../models/schema.models';
import {
  resolveContentfulAssetUrl,
} from '../utils/contentful-asset.util';

const SCHEMA_SCRIPT_ID = 'structured-data';

@Injectable({
  providedIn: 'root',
})
export class StructuredDataService {
  private readonly document = inject(DOCUMENT);

  setPersonGraph(content: PortfolioContent): void {
    this.injectJsonLd(this.buildPersonGraph(content));
  }

  setNotFoundGraph(): void {
    this.injectJsonLd(this.buildNotFoundGraph());
  }

  private buildPersonGraph(content: PortfolioContent): SchemaGraph {
    const description = this.buildDescription(content);
    const profileImage = this.buildProfileImage(content);
    const skills = this.collectSkills(content);
    const person = this.buildPerson(content, description, profileImage, skills);
    const projects = content.projects ?? [];

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfilePage',
          '@id': `${SITE_URL}/#profile`,
          url: `${SITE_URL}/`,
          name: `${SITE_NAME} — Portfolio`,
          description,
          inLanguage: 'en',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          primaryImageOfPage: profileImage,
          mainEntity: person,
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: SITE_NAME,
          inLanguage: 'en',
          publisher: { '@id': `${SITE_URL}/#person` },
        },
        {
          '@type': 'ItemList',
          '@id': `${SITE_URL}/#projects`,
          name: 'Projects',
          numberOfItems: projects.length,
          itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CreativeWork',
              name: project.title ?? 'Project',
              description: this.plainText(project.desc ?? ''),
              url: this.resolveAbsoluteUrl(project.liveUrl || project.gitUrl),
              author: { '@id': `${SITE_URL}/#person` },
            },
          })),
        },
      ],
    };
  }

  private buildPerson(
    content: PortfolioContent,
    description: string,
    profileImage: ImageObjectSchema,
    skills: string[],
  ): PersonSchema {
    const currentJob = content.jobs.find((job) => job.status);

    return {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SITE_NAME,
      alternateName: LEGAL_NAME,
      jobTitle: currentJob?.title?.trim() || JOB_TITLE,
      email: EMAIL,
      url: `${SITE_URL}/`,
      image: profileImage,
      description,
      mainEntityOfPage: { '@id': `${SITE_URL}/#profile` },
      address: {
        '@type': 'PostalAddress',
        addressLocality: ADDRESS_LOCALITY,
        addressCountry: ADDRESS_COUNTRY,
      },
      ...(currentJob?.company
        ? {
            worksFor: {
              '@type': 'Organization',
              name: currentJob.company,
              ...(currentJob.url
                ? { url: this.resolveAbsoluteUrl(currentJob.url) }
                : {}),
            },
          }
        : {}),
      hasOccupation: content.jobs
        .filter((job) => job.title && job.company)
        .map((job) => ({
          '@type': 'Occupation',
          name: job.title!.trim(),
          worksFor: {
            '@type': 'Organization',
            name: job.company!.trim(),
            ...(job.url ? { url: this.resolveAbsoluteUrl(job.url) } : {}),
          },
        })),
      knowsAbout: skills,
      sameAs: [...SAME_AS],
      subjectOf: [
        {
          '@type': 'DigitalDocument',
          name: `${SITE_NAME} — Resume`,
          url: this.resolveResumeUrl(content),
          encodingFormat: 'application/pdf',
        },
      ],
    };
  }

  private buildNotFoundGraph(): SchemaGraph {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: SITE_NAME,
          inLanguage: 'en',
          publisher: { '@id': `${SITE_URL}/#person` },
        },
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/404#webpage`,
          url: `${SITE_URL}/404`,
          name: 'Page Not Found',
          description: `The requested page could not be found on ${SITE_NAME}'s portfolio.`,
          isPartOf: { '@id': `${SITE_URL}/#website` },
        },
      ],
    };
  }

  private buildProfileImage(content: PortfolioContent): ImageObjectSchema {
    const url = this.resolveProfileImageUrl(content);

    return {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#person-image`,
      url,
      contentUrl: url,
      caption: SITE_NAME,
    };
  }

  private injectJsonLd(graph: SchemaGraph): void {
    const head = this.document.head;
    this.document.getElementById(SCHEMA_SCRIPT_ID)?.remove();

    const script = this.document.createElement('script');
    script.id = SCHEMA_SCRIPT_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(graph);
    head.appendChild(script);
  }

  private buildDescription(_content: PortfolioContent): string {
    return SEO_DESCRIPTION;
  }

  private resolveProfileImageUrl(content: PortfolioContent): string {
    const url = content.image[0]?.profileImg?.fields?.file?.url;
    if (!url) {
      return `${SITE_URL}/assets/images/ht.svg`;
    }
    return url.startsWith('http') ? url : `https:${url}`;
  }

  private resolveResumeUrl(content: PortfolioContent): string {
    const url = resolveContentfulAssetUrl(content.resume[0]?.resume);
    return url ?? RESUME_URL;
  }

  private resolveAbsoluteUrl(url?: string): string {
    if (!url?.trim()) {
      return SITE_URL;
    }

    const value = url.trim();
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return value;
    }
    if (value.startsWith('//')) {
      return `https:${value}`;
    }
    if (value.startsWith('/')) {
      return `${SITE_URL}${value}`;
    }
    return `https://${value}`;
  }

  private collectSkills(content: PortfolioContent): string[] {
    const merged = content.about.flatMap((entry) => entry.skills ?? []);
    return [...new Set([...merged, ...SEO_EXTRA_SKILLS].filter(Boolean))];
  }

  private plainText(markdown: string): string {
    return markdown
      .replace(/!\[[^\]]*]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
      .replace(/[#>*_`~-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength - 1).trimEnd()}…`;
  }
}
