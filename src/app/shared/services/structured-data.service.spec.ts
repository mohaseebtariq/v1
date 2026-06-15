import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { StructuredDataService } from './structured-data.service';
import type { PortfolioContent } from '../models/contentful.models';

describe('StructuredDataService', () => {
  let service: StructuredDataService;
  let document: Document;

  const sampleContent: PortfolioContent = {
    headline: [{ headline: 'Building modern web applications.' }],
    about: [{ desc: 'About me', skills: ['Angular', 'TypeScript'] }],
    image: [
      {
        profileImg: {
          fields: {
            file: {
              url: '//images.ctfassets.net/example/profile.jpg',
            },
          },
        },
      },
    ],
    resume: [
      {
        resume: {
          fields: {
            file: {
              url: '//assets.ctfassets.net/example/resume.pdf',
              fileName: 'Haseeb-Tariq-Resume.pdf',
            },
          },
        },
      },
    ],
    jobs: [
      {
        title: 'Senior Consultant',
        company: 'Systems Limited',
        status: true,
        url: 'https://www.systemsltd.com/',
      },
    ],
    projects: [
      {
        title: 'Personal Portfolio',
        desc: 'Angular portfolio',
        liveUrl: 'haseebtariq.dev',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructuredDataService);
    document = TestBed.inject(DOCUMENT);
  });

  it('injects ProfilePage schema with embedded Person mainEntity', () => {
    service.setPersonGraph(sampleContent);

    const script = document.getElementById(
      'structured-data',
    ) as HTMLScriptElement | null;
    expect(script).toBeTruthy();

    const graph = JSON.parse(script!.textContent ?? '{}');
    const profilePage = graph['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'ProfilePage',
    );

    expect(profilePage.mainEntity['@type']).toBe('Person');
    expect(profilePage.mainEntity.name).toBe('Haseeb Tariq');
    expect(profilePage.mainEntity.alternateName).toBe('Haseeb Tariq');
    expect(profilePage.mainEntity.jobTitle).toBe('Senior Consultant');
    expect(profilePage.mainEntity.image.url).toBe(
      'https://images.ctfassets.net/example/profile.jpg',
    );
    expect(profilePage.mainEntity.knowsAbout).toContain('Generative AI');
    expect(profilePage.mainEntity.knowsAbout).toContain('Angular');
    expect(profilePage.mainEntity.sameAs).toContain(
      'https://www.linkedin.com/in/mohaseebtariq',
    );
    expect(profilePage.mainEntity.subjectOf[0].encodingFormat).toBe(
      'application/pdf',
    );
    expect(profilePage.mainEntity.subjectOf[0].url).toBe(
      'https://assets.ctfassets.net/example/resume.pdf',
    );

    const itemList = graph['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'ItemList',
    );
    expect(itemList.itemListElement[0].item.url).toBe('https://haseebtariq.dev');
  });

  it('injects WebPage schema for not-found route', () => {
    service.setNotFoundGraph();

    const script = document.getElementById(
      'structured-data',
    ) as HTMLScriptElement | null;
    const graph = JSON.parse(script!.textContent ?? '{}');
    const webPage = graph['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'WebPage',
    );

    expect(webPage.name).toBe('Page Not Found');
    expect(
      graph['@graph'].some(
        (node: { '@type': string }) => node['@type'] === 'ProfilePage',
      ),
    ).toBeFalse();
  });
});
