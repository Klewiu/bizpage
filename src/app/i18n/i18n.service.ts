import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import type { Locale } from './translations';
import { translations } from './translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly localeSignal = signal<Locale>('en');

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

  t(key: string): string {
    return translations[key]?.[this.localeSignal()] ?? key;
  }

  private detectLocale(): Locale {
    if (!isPlatformBrowser(this.platformId)) {
      return 'en';
    }

    const language = (navigator.language || '').toLowerCase();
    return language.startsWith('pl') ? 'pl' : 'en';
  }
}
