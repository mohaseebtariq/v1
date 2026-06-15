import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LayoutComponent } from './layout.component';
import { ContentfulService } from '../../services/contentful.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [
        {
          provide: ContentfulService,
          useValue: {
            getHeadline: () => of([]),
            getAbout: () => of([]),
            getImage: () => of([]),
            getJobs: () => of([]),
            getProjects: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
