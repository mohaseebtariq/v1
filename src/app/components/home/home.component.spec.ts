import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { ContentfulService } from '../../shared/services/contentful.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: ContentfulService,
          useValue: {
            getHeadline: () =>
              of([
                {
                  headline:
                    'Based in Islamabad, Pakistan, I strive to stay at the forefront of technology.',
                },
              ]),
            getResume: () =>
              of([
                {
                  resume: {
                    fields: {
                      file: {
                        url: '//assets.ctfassets.net/example/resume.pdf',
                        fileName: 'resume.pdf',
                      },
                    },
                  },
                },
              ]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render resume link from Contentful', () => {
    const link = fixture.nativeElement.querySelector(
      'a.btn-outline',
    ) as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe(
      'https://assets.ctfassets.net/example/resume.pdf',
    );
  });

  it('should fall back to static resume when Contentful has no entry', async () => {
    const contentful = TestBed.inject(ContentfulService);
    spyOn(contentful, 'getResume').and.returnValue(of([]));
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector(
      'a.btn-outline',
    ) as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/assets/resume.pdf');
  });
});
