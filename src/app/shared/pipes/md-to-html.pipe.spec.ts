import { TestBed } from '@angular/core/testing';
import { MdToHtmlPipe } from './md-to-html.pipe';
import { ContentfulService } from '../services/contentful.service';

describe('MdToHtmlPipe', () => {
  it('create an instance', () => {
    TestBed.configureTestingModule({
      providers: [
        MdToHtmlPipe,
        {
          provide: ContentfulService,
          useValue: { markdownToHtml: (md: string) => md },
        },
      ],
    });
    const pipe = TestBed.inject(MdToHtmlPipe);
    expect(pipe).toBeTruthy();
  });
});
