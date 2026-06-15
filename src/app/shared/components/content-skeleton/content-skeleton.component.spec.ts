import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSkeletonComponent } from './content-skeleton.component';

describe('ContentSkeletonComponent', () => {
  let component: ContentSkeletonComponent;
  let fixture: ComponentFixture<ContentSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSkeletonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
