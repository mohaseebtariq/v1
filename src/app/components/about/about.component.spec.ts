import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AboutComponent } from './about.component';
import { ContentfulService } from '../../shared/services/contentful.service';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        {
          provide: ContentfulService,
          useValue: {
            getAbout: () => of([]),
            getImage: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
