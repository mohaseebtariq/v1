import { Pipe, PipeTransform } from '@angular/core';
import { ContentfulService } from '../services/contentful.service';

@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlPipe implements PipeTransform {

  constructor(private contentful: ContentfulService) {}

  transform(value: string): any {
    return this.contentful.markdownToHtml(value);
  }

}
