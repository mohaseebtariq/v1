import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  ContentfulClientApi,
  createClient,
} from 'contentful';
import { from } from 'rxjs';
import * as marked from 'marked';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContentfulService {

  private clientApi: ContentfulClientApi;

  constructor() {
    this.clientApi = createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.token,
    });
  }

  getDetails(item) {
    const promise = this.clientApi.getEntries(
      Object.assign({
        content_type: item
      }))
    return from(promise).pipe(map(entry => entry.items.map(i => i.fields)))
  }
  
  markdownToHtml(md: string) {
    return marked(md);
  }

}
