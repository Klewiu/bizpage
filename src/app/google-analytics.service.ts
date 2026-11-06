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
 * Podstawowy Google Consent Mode:
 * - tag Google nie jest pobierany przed zgodą na analitykę,
 * - zgoda reklamowa i personalizacja pozostają zawsze wyłączone,
 * - cofnięcie zgody zatrzymuje kolekcję i usuwa cookies analityczne.
 */
@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly consent = inject(CookieConsentService);
  private readonly measurementId = GOOGLE_TAG_MANAGER_ID.trim();
  private consentDefaultSet = false;

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    effect(() => {
      if (this.consent.choices().analytics) {
        this.enableAnalytics();
      } else {
        this.disableAnalytics();
      }
    });
  }

  private enableAnalytics(): void {
    if (!this.hasValidMeasurementId()) return;

    const analyticsWindow = this.document.defaultView as AnalyticsWindow | null;
    if (!analyticsWindow) return;

    this.ensureGtag(analyticsWindow);

    if (!this.consentDefaultSet) {
      analyticsWindow.gtag?.('consent', 'default', this.deniedConsent());
      this.consentDefaultSet = true;
    }
    analyticsWindow.gtag?.('consent', 'update', {
      ...this.deniedConsent(),
      analytics_storage: 'granted'
    });

    if (!this.document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
      analyticsWindow.gtag?.('js', new Date());
      analyticsWindow.dataLayer?.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

      const script = this.document.createElement('script');
      script.id = GOOGLE_TAG_SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(this.measurementId)}`;
      this.document.head.appendChild(script);
    }
  }

  private disableAnalytics(): void {
    const analyticsWindow = this.document.defaultView as AnalyticsWindow | null;

    if (analyticsWindow && this.hasValidMeasurementId() && this.consentDefaultSet) {
      analyticsWindow.gtag?.('consent', 'update', this.deniedConsent());
    }

    this.document.getElementById(GOOGLE_TAG_SCRIPT_ID)?.remove();
    this.clearAnalyticsCookies();
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
