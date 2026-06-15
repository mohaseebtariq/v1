export interface SchemaGraph {
  '@context': 'https://schema.org';
  '@graph': SchemaNode[];
}

export type SchemaNode =
  | ProfilePageSchema
  | WebSiteSchema
  | PersonSchema
  | ItemListSchema
  | WebPageSchema
  | ImageObjectSchema;

export interface ImageObjectSchema {
  '@type': 'ImageObject';
  '@id'?: string;
  url: string;
  contentUrl?: string;
  caption?: string;
}

export interface ProfilePageSchema {
  '@type': 'ProfilePage';
  '@id': string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  isPartOf: { '@id': string };
  primaryImageOfPage?: ImageObjectSchema;
  mainEntity: PersonSchema;
}

export interface WebSiteSchema {
  '@type': 'WebSite';
  '@id': string;
  url: string;
  name: string;
  inLanguage: string;
  publisher: { '@id': string };
}

export interface WebPageSchema {
  '@type': 'WebPage';
  '@id': string;
  url: string;
  name: string;
  description: string;
  isPartOf: { '@id': string };
}

export interface PersonSchema {
  '@type': 'Person';
  '@id': string;
  name: string;
  alternateName?: string;
  jobTitle: string;
  email: string;
  url: string;
  image: ImageObjectSchema;
  description: string;
  mainEntityOfPage: { '@id': string };
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressCountry: string;
  };
  worksFor?: {
    '@type': 'Organization';
    name: string;
    url?: string;
  };
  hasOccupation?: OccupationSchema[];
  knowsAbout: string[];
  sameAs: string[];
  subjectOf?: DigitalDocumentSchema[];
}

export interface OccupationSchema {
  '@type': 'Occupation';
  name: string;
  occupationalCategory?: string;
  worksFor?: {
    '@type': 'Organization';
    name: string;
    url?: string;
  };
}

export interface DigitalDocumentSchema {
  '@type': 'DigitalDocument';
  name: string;
  url: string;
  encodingFormat: string;
}

export interface ItemListSchema {
  '@type': 'ItemList';
  '@id': string;
  name: string;
  numberOfItems: number;
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    item: {
      '@type': 'CreativeWork';
      name: string;
      description: string;
      url: string;
      author?: { '@id': string };
    };
  }[];
}
