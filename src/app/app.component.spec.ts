import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

<<<<<<< HEAD
  it(`should have as title 'portfolio'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('portfolio');
=======
  it(`should have as title 'Personal-Portfolio'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Personal-Portfolio');
>>>>>>> 90451c1e4c839a323003adfde1de10aa66b0b525
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
<<<<<<< HEAD
    expect(compiled.querySelector('.content span').textContent).toContain('portfolio app is running!');
=======
    expect(compiled.querySelector('.content span').textContent).toContain('Personal-Portfolio app is running!');
>>>>>>> 90451c1e4c839a323003adfde1de10aa66b0b525
  });
});
