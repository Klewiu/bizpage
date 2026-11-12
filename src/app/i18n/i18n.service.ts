import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import type { Locale } from './translations';
import { translations } from './translations';
import { germanTranslations } from './translations.de';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly localeSignal = signal<Locale>('pl');

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    const detected = this.detectLocale();
    this.localeSignal.set(detected);
    this.document.documentElement.lang = detected;
  }

  locale(): Locale {
    return this.localeSignal();
  }

  setLocale(locale: Locale): void {
    this.localeSignal.set(locale);
    this.document.documentElement.lang = locale;
  }

  localizedPath(path: string, locale: Locale = this.locale()): string {
    const unprefixedPath = path.replace(/^\/(en|de)(?=\/|$)/, '') || '/';
    return locale === 'pl' ? unprefixedPath : `/${locale}${unprefixedPath === '/' ? '' : unprefixedPath}`;
  }

  t(key: string): string {
    const locale = this.localeSignal();
    if (locale === 'de') {
      const german: Record<string, string> = germanTranslations;
      return german[key] ?? key;
    }
    const otherTranslations: Record<string, Record<'pl' | 'en', string>> = translations;
    return otherTranslations[key]?.[locale] ?? key;
  }

  private detectLocale(): Locale {
    if (!isPlatformBrowser(this.platformId)) {
      return 'pl';
    }

    const language = (navigator.language || '').toLowerCase();
    const primaryLanguage = language.split('-')[0];
    if (primaryLanguage === 'pl' || primaryLanguage === 'de') {
      return primaryLanguage;
    }
    return 'en';
  }
}
