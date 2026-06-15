import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { ContentfulService } from '../../shared/services/contentful.service';
import { MdToHtmlPipe } from '../../shared/pipes/md-to-html.pipe';
import { ContentSkeletonComponent } from '../../shared/components/content-skeleton/content-skeleton.component';
import { SectionComponent } from '../../shared/components/section/section.component';
import type { JobEntry } from '../../shared/models/contentful.models';
import { prefersReducedMotion } from '../../shared/utils/motion.util';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MdToHtmlPipe, ContentSkeletonComponent, SectionComponent],
})
export class ExperienceComponent {
  private readonly contentful = inject(ContentfulService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly tabListRef = viewChild<ElementRef<HTMLElement>>('tabList');

  readonly jobsResource = rxResource({
    stream: () => this.contentful.getJobs(),
  });

  readonly activeTabIndex = signal(0);
  readonly isScrollable = signal(false);
  readonly canScrollLeft = signal(false);
  readonly canScrollRight = signal(false);
  readonly scrollThumbWidth = signal(100);
  readonly scrollThumbOffset = signal(0);

  private tabsInitialized = false;
  private scrollListenersAttached = false;

  constructor() {
    effect(() => {
      const jobs = this.jobsResource.value() as JobEntry[] | undefined;
      if (!jobs?.length) {
        return;
      }

      if (!this.tabsInitialized) {
        const defaultIndex = jobs.findIndex((job) => job.status);
        this.activeTabIndex.set(defaultIndex >= 0 ? defaultIndex : 0);
        this.tabsInitialized = true;
      }

      queueMicrotask(() => {
        this.attachScrollListeners();
        this.updateScrollState();
        this.scrollTabIntoView(this.activeTabIndex(), 'auto');
      });
    });
  }

  selectTab(index: number): void {
    this.activeTabIndex.set(index);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    queueMicrotask(() => {
      this.scrollTabIntoView(index);
      this.updateScrollState();
    });
  }

  onTabKeydown(event: KeyboardEvent, index: number, total: number): void {
    let nextIndex = index;
    const { key } = event;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      nextIndex = (index + 1) % total;
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      nextIndex = (index - 1 + total) % total;
    } else if (key === 'Home') {
      nextIndex = 0;
    } else if (key === 'End') {
      nextIndex = total - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.selectTab(nextIndex);
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(`experience-tab-${nextIndex}`)?.focus();
    }
  }

  private scrollFrameId: number | null = null;

  private attachScrollListeners(): void {
    if (!isPlatformBrowser(this.platformId) || this.scrollListenersAttached) {
      return;
    }

    const el = this.tabListRef()?.nativeElement;
    if (!el) {
      return;
    }

    this.scrollListenersAttached = true;

    const onScroll = () => {
      if (this.scrollFrameId !== null) {
        return;
      }

      this.scrollFrameId = requestAnimationFrame(() => {
        this.scrollFrameId = null;
        this.updateScrollState();
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(el);

    this.destroyRef.onDestroy(() => {
      el.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
      if (this.scrollFrameId !== null) {
        cancelAnimationFrame(this.scrollFrameId);
      }
    });

    onScroll();
  }

  private updateScrollState(): void {
    const el = this.tabListRef()?.nativeElement;
    if (!el) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const scrollable = scrollWidth > clientWidth + 1;

    this.isScrollable.set(scrollable);
    this.canScrollLeft.set(scrollable && scrollLeft > 1);
    this.canScrollRight.set(scrollable && scrollLeft + clientWidth < scrollWidth - 1);

    if (scrollable) {
      const thumbWidthPercent = (clientWidth / scrollWidth) * 100;
      const maxScroll = scrollWidth - clientWidth;
      const track = el
        .closest('.experience__tab-nav')
        ?.querySelector('.experience__scroll-track') as HTMLElement | null;
      const trackWidth = track?.clientWidth ?? clientWidth;
      const thumbWidthPx = (thumbWidthPercent / 100) * trackWidth;
      const maxThumbOffset = Math.max(0, trackWidth - thumbWidthPx);
      const scrollRatio = maxScroll > 0 ? scrollLeft / maxScroll : 0;

      this.scrollThumbWidth.set(thumbWidthPercent);
      this.scrollThumbOffset.set(scrollRatio * maxThumbOffset);
    }
  }

  private scrollTabIntoView(
    index: number,
    behavior: ScrollBehavior = 'smooth',
  ): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const container = this.tabListRef()?.nativeElement;
    const tab = document.getElementById(`experience-tab-${index}`);

    if (!container || !tab) {
      return;
    }

    const maxScroll = container.scrollWidth - container.clientWidth;
    const tabStart = tab.offsetLeft;
    const tabEnd = tabStart + tab.offsetWidth;
    const viewStart = container.scrollLeft;
    const viewEnd = viewStart + container.clientWidth;

    let target = viewStart;

    if (tabStart < viewStart) {
      target = tabStart;
    } else if (tabEnd > viewEnd) {
      target = tabEnd - container.clientWidth;
    } else {
      return;
    }

    container.scrollTo({
      left: Math.max(0, Math.min(target, maxScroll)),
      behavior: prefersReducedMotion() ? 'auto' : behavior,
    });
  }
}
