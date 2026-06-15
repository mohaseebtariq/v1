import {
  inject,
  Injectable,
  makeStateKey,
  SecurityContext,
  TransferState,
} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { createClient, type ContentfulClientApi } from 'contentful';
import { marked } from 'marked';
import { forkJoin, map, Observable, of } from 'rxjs';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import type {
  AboutEntry,
  HeadlineEntry,
  ImageEntry,
  JobEntry,
  PortfolioContent,
  ProjectEntry,
  ResumeEntry,
} from '../models/contentful.models';

const PORTFOLIO_CONTENT_KEY = makeStateKey<PortfolioContent>('portfolioContent');

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly transferState = inject(TransferState);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly clientApi: ContentfulClientApi<undefined>;
  private memoryCache: PortfolioContent | null = null;

  constructor() {
    if (this.transferState.hasKey(PORTFOLIO_CONTENT_KEY)) {
      this.memoryCache = this.transferState.get(PORTFOLIO_CONTENT_KEY, null);
      if (isPlatformBrowser(this.platformId)) {
        this.transferState.remove(PORTFOLIO_CONTENT_KEY);
      }
    }

    this.clientApi = createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.token,
    });
  }

  prefetchAll(): Observable<PortfolioContent> {
    if (this.memoryCache) {
      return of(this.memoryCache);
    }

    return forkJoin({
      headline: this.fetchDetails<HeadlineEntry>('headline'),
      about: this.fetchDetails<AboutEntry>('about'),
      image: this.fetchDetails<ImageEntry>('image'),
      resume: this.fetchDetails<ResumeEntry>('resume'),
      jobs: this.fetchDetails<JobEntry>('jobs'),
      projects: this.fetchDetails<ProjectEntry>('projects'),
    }).pipe(
      tap((content) => {
        this.memoryCache = content;
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(PORTFOLIO_CONTENT_KEY, content);
        }
      }),
    );
  }

  getHeadline(): Observable<HeadlineEntry[]> {
    return this.getCachedSlice((content) => content.headline, () =>
      this.fetchDetails<HeadlineEntry>('headline'),
    );
  }

  getAbout(): Observable<AboutEntry[]> {
    return this.getCachedSlice((content) => content.about, () =>
      this.fetchDetails<AboutEntry>('about'),
    );
  }

  getImage(): Observable<ImageEntry[]> {
    return this.getCachedSlice((content) => content.image, () =>
      this.fetchDetails<ImageEntry>('image'),
    );
  }

  getResume(): Observable<ResumeEntry[]> {
    return this.getCachedSlice((content) => content.resume, () =>
      this.fetchDetails<ResumeEntry>('resume'),
    );
  }

  getJobs(): Observable<JobEntry[]> {
    return this.getCachedSlice((content) => content.jobs, () =>
      this.fetchDetails<JobEntry>('jobs'),
    );
  }

  getProjects(): Observable<ProjectEntry[]> {
    return this.getCachedSlice((content) => content.projects, () =>
      this.fetchDetails<ProjectEntry>('projects'),
    );
  }

  markdownToHtml(md: string): SafeHtml {
    const parsed = marked.parse(md ?? '') as string;
    const sanitized =
      this.sanitizer.sanitize(SecurityContext.HTML, parsed) ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(sanitized);
  }

  private getCachedSlice<T>(
    selector: (content: PortfolioContent) => T,
    fetcher: () => Observable<T>,
  ): Observable<T> {
    if (this.memoryCache) {
      return of(selector(this.memoryCache));
    }
    return fetcher();
  }

  private fetchDetails<T>(contentType: string): Observable<T[]> {
    const promise = this.clientApi.getEntries({
      content_type: contentType,
    });
    return from(promise).pipe(
      map((entry) => entry.items.map((item) => item.fields as unknown as T)),
    );
  }
}
