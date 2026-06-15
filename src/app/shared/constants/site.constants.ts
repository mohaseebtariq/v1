export const SITE_URL = 'https://www.haseebtariq.dev';

/** Primary public persona / brand name. */
export const SITE_NAME = 'Haseeb Tariq';

/** Full legal name — schema alternateName and keyword discovery only. */
export const LEGAL_NAME = 'Muhammad Haseeb Tariq';

export const JOB_TITLE = 'Senior Full Stack Engineer';

export const YEARS_OF_EXPERIENCE = 6;

export const EMAIL = 'mohaseebtariq@gmail.com';

export const ADDRESS_LOCALITY = 'Islamabad';

export const ADDRESS_COUNTRY = 'PK';

export const RESUME_URL = `${SITE_URL}/assets/resume.pdf`;

/** Authoritative profile URLs for JSON-LD sameAs and identity linking. */
export const SAME_AS = [
  'https://github.com/mohaseebtariq',
  'https://www.linkedin.com/in/mohaseebtariq',
  'https://t.me/mehaseebtariq',
  'https://www.instagram.com/mohaseebtariq',
  'https://twitter.com/thatguyhaseeb',
] as const;

/** Extra skills surfaced in SEO schema, meta keywords, and the about section. */
export const SEO_EXTRA_SKILLS = [
  'Artificial Intelligence',
  'Generative AI',
  'Large Language Models',
  'LLM Integration',
  'OpenAI API',
  'Prompt Engineering',
  'AI-assisted Development',
  'Machine Learning',
  'RAG',
  'AI Agents',
] as const;

export const SEO_KEYWORDS = [
  SITE_NAME,
  LEGAL_NAME,
  JOB_TITLE,
  'Frontend Engineer',
  'Angular Developer',
  'Web Developer',
  'Islamabad',
  ...SEO_EXTRA_SKILLS,
].join(', ');

export const SEO_DESCRIPTION =
  `${SITE_NAME} — ${JOB_TITLE} with ${YEARS_OF_EXPERIENCE}+ years of experience building end-to-end web applications, APIs, and AI-focused software in Islamabad, Pakistan.`;
