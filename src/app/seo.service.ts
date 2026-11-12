import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { I18nService } from './i18n/i18n.service';

/** Publiczny adres produkcyjny strony – używany do canonical, Open Graph i JSON-LD. */
export const SITE_URL = 'https://wickywave.pl';
export const SITE_NAME = 'WickyWave Software';

export interface SeoTags {
  title: string;
  description: string;
  keywords?: string;
  /** Opcjonalna ścieżka do obrazu OG/Twitter (względem SITE_URL). */
  image?: string;
  /** Opcjonalne wymuszenie ścieżki canonical (np. '/' dla strony głównej). */
  canonicalPath?: string;
}

/**
 * Centralny serwis SEO: ustawia <title>, meta description, Open Graph/Twitter Cards,
 * canonical URL (wyliczany z aktualnej trasy routera) oraz wstrzykuje znaczniki JSON-LD.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(I18nService);

  updateTags(tags: SeoTags): void {
    const path = tags.canonicalPath || this.router.url.split(/[?#]/, 1)[0];
    const canonicalUrl = this.buildUrl(this.i18n.localizedPath(path));

    this.title.setTitle(tags.title);

    this.meta.updateTag({ name: 'description', content: tags.description });
    if (tags.keywords) {
      this.meta.updateTag({ name: 'keywords', content: tags.keywords });
    } else {
      this.meta.removeTag('name="keywords"');
    }
    this.meta.updateTag({ property: 'og:title', content: tags.title });
    this.meta.updateTag({ property: 'og:description', content: tags.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    const ogLocales = { pl: 'pl_PL', en: 'en_US', de: 'de_DE' };
    this.meta.updateTag({ property: 'og:locale', content: ogLocales[this.i18n.locale()] });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    this.meta.updateTag({ name: 'twitter:description', content: tags.description });

    if (tags.image) {
      const imageUrl = `${SITE_URL}${tags.image}`;
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    }

    this.setCanonicalLink(canonicalUrl);
    this.setAlternateLinks(path);
  }

  /** Wstrzykuje (lub podmienia) blok JSON-LD o podanym id w <head>. */
  setJsonLd(id: string, data: Record<string, unknown>): void {
    const scriptId = `jsonld-${id}`;
    let script = this.document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  removeJsonLd(id: string): void {
    this.document.getElementById(`jsonld-${id}`)?.remove();
  }

  private buildUrl(path: string): string {
    return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  }

  private setCanonicalLink(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private setAlternateLinks(path: string): void {
    for (const locale of ['pl', 'en', 'de', 'x-default'] as const) {
      let link = this.document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${locale}"]`);
      if (!link) {
        link = this.document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = locale;
        this.document.head.appendChild(link);
      }
      link.href = this.buildUrl(this.i18n.localizedPath(path, locale === 'x-default' ? 'pl' : locale));
    }
  }
}
