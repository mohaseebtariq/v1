export interface ContentfulAssetFile {
  url?: string;
  contentType?: string;
  fileName?: string;
}

export interface ContentfulAsset {
  fields?: {
    file?: ContentfulAssetFile;
    title?: string;
  };
}

export function resolveContentfulAssetUrl(
  asset?: ContentfulAsset,
): string | null {
  const url = asset?.fields?.file?.url;
  if (!url) {
    return null;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return url.startsWith('//') ? `https:${url}` : url;
}

export function resolveContentfulAssetFileName(
  asset?: ContentfulAsset,
  fallback = 'resume.pdf',
): string {
  return asset?.fields?.file?.fileName?.trim() || fallback;
}

export const RESUME_FALLBACK_PATH = '/assets/resume.pdf';

export function resolveResumeLink(
  entries: { resume?: ContentfulAsset }[],
  fallbackPath = RESUME_FALLBACK_PATH,
): { url: string; fileName: string } {
  const asset = entries[0]?.resume;
  const url = resolveContentfulAssetUrl(asset);

  if (url) {
    return {
      url,
      fileName: resolveContentfulAssetFileName(asset),
    };
  }

  return {
    url: fallbackPath,
    fileName: 'resume.pdf',
  };
}
