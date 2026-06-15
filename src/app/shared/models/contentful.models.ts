export interface HeadlineEntry {
  headline?: string;
}

export interface AboutEntry {
  desc?: string;
  skills?: string[];
}

export interface ImageEntry {
  profileImg?: {
    fields?: {
      file?: {
        url?: string;
      };
    };
  };
}

/** Contentful content type: resume — field `resume` is a PDF/media asset. */
export interface ResumeEntry {
  resume?: {
    fields?: {
      file?: {
        url?: string;
        contentType?: string;
        fileName?: string;
      };
    };
  };
}

export interface JobEntry {
  company?: string;
  title?: string;
  description?: string;
  status?: boolean;
  url?: string;
  range?: string;
  location?: string;
}

export interface ProjectEntry {
  title?: string;
  desc?: string;
  liveUrl?: string;
  gitUrl?: string;
  tech?: string[];
}

export interface PortfolioContent {
  headline: HeadlineEntry[];
  about: AboutEntry[];
  image: ImageEntry[];
  resume: ResumeEntry[];
  jobs: JobEntry[];
  projects: ProjectEntry[];
}
