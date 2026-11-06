import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject } from '@angular/core';
import { CookieConsentService } from './cookie-consent.service';
import { GOOGLE_TAG_MANAGER_ID } from './google-analytics.config';

const GOOGLE_TAG_SCRIPT_ID = 'google-analytics-gtag';
const ANALYTICS_COOKIE_PREFIXES = ['_ga', '_gid', '_gat', '_gac_', '_gcl_'];

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/**
 * Google Consent Mode v2 (tryb zaawansowany):
 * - GTM ładuje się zawsze, ale wszystkie zgody (analytics_storage, ad_storage,
 *   ad_user_data, ad_personalization) są domyślnie "denied" – bez cookies i identyfikatorów,
 * - zgoda na analitykę przełącza tylko analytics_storage na "granted",
 * - zgody reklamowe pozostają zawsze "denied",
 * - cofnięcie zgody przywraca "denied" i usuwa cookies analityczne.
 */
@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly consent = inject(CookieConsentService);
  private readonly measurementId = GOOGLE_TAG_MANAGER_ID.trim();

  constructor() {
    if (!isPlatformBrowser(this.platformId) || !this.hasValidMeasurementId()) return;

    const analyticsWindow = this.document.defaultView as AnalyticsWindow | null;
    if (!analyticsWindow) return;

    this.ensureGtag(analyticsWindow);
    analyticsWindow.gtag?.('consent', 'default', { ...this.deniedConsent(), wait_for_update: 500 });
    this.loadTagManager(analyticsWindow);

    effect(() => {
      if (this.consent.choices().analytics) {
        analyticsWindow.gtag?.('consent', 'update', {
          ...this.deniedConsent(),
          analytics_storage: 'granted'
        });
      } else {
        analyticsWindow.gtag?.('consent', 'update', this.deniedConsent());
        this.clearAnalyticsCookies();
      }
    });
  }

  private loadTagManager(analyticsWindow: AnalyticsWindow): void {
    if (this.document.getElementById(GOOGLE_TAG_SCRIPT_ID)) return;

    analyticsWindow.gtag?.('js', new Date());
    analyticsWindow.dataLayer?.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = this.document.createElement('script');
    script.id = GOOGLE_TAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(this.measurementId)}`;
    this.document.head.appendChild(script);
  }

  private ensureGtag(analyticsWindow: AnalyticsWindow): void {
    analyticsWindow.dataLayer ??= [];

    analyticsWindow.gtag ??= function gtag(..._args: unknown[]): void {
      analyticsWindow.dataLayer?.push(arguments);
    };
  }

  private clearAnalyticsCookies(): void {
    const cookieNames = this.document.cookie
      .split(';')
      .map((cookie) => cookie.split('=')[0]?.trim())
      .filter((name): name is string => Boolean(name))
      .filter((name) => ANALYTICS_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix)));

    const hostname = this.document.location?.hostname;

    for (const name of cookieNames) {
      const expiredCookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
      this.document.cookie = expiredCookie;

      if (hostname && hostname !== 'localhost') {
        this.document.cookie = `${expiredCookie}; domain=${hostname}`;
        this.document.cookie = `${expiredCookie}; domain=.${hostname}`;
      }
    }
  }

  private hasValidMeasurementId(): boolean {
    return /^GTM-[A-Z0-9]+$/i.test(this.measurementId);
  }

  private deniedConsent(): Record<string, 'denied'> {
    return {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    };
  }
}
