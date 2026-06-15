import { inject, Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ContentfulService } from '../services/contentful.service';

@Pipe({
  name: 'mdToHtml',
  standalone: true,
})
export class MdToHtmlPipe implements PipeTransform {
  private readonly contentful = inject(ContentfulService);

  transform(value: string | undefined): SafeHtml {
    return this.contentful.markdownToHtml(value ?? '');
  }
}
