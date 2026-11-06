import { NgFor, NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CookieBannerComponent } from './cookie-banner.component';
import { CookieConsentService } from './cookie-consent.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import { I18nService } from './i18n/i18n.service';
import type { Locale } from './i18n/translations';
import { OceanBannerComponent } from './ocean-banner.component';
import { SeoService, SITE_URL, SITE_NAME } from './seo.service';

@Component({
  selector: 'app-root',
  imports: [NgFor, NgTemplateOutlet, RouterLink, RouterOutlet, OceanBannerComponent, CookieBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly i18n = inject(I18nService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly cookieConsent = inject(CookieConsentService);
  private readonly googleAnalytics = inject(GoogleAnalyticsService);
  private readonly seo = inject(SeoService);

  protected readonly isMobileMenuOpen = signal(false);
  protected readonly activeHomeSection = signal<'home' | 'offer'>('home');
  protected readonly timeOfDay = signal(0.28);
  protected readonly darkModeManual = signal<boolean | null>(null);

  protected readonly navItems: { path: string; label: string; scrollTarget?: string }[] = [
    { path: '/',             label: 'menu.home' },
    { path: '/',             label: 'menu.offer',      scrollTarget: 'uslugi' },
    { path: '/aktywne-saas', label: 'menu.activeSaas' },
    { path: '/contact',      label: 'menu.contact' }
  ];

  constructor() {
    this.seo.setJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      email: 'kontakt@wickywave.pl',
      description:
        'Software house tworzący dedykowane aplikacje webowe, panele administracyjne i systemy wewnętrzne.'
    });

    this.seo.setJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL
    });
  }

  protected t(key: string): string {
    return this.i18n.t(key);
  }

  protected locale(): Locale {
    return this.i18n.locale();
  }

  protected setLocale(locale: Locale): void {
    this.i18n.setLocale(locale);
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((current) => !current);
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  protected handleNavClick(item: { path: string; scrollTarget?: string }): void {
    this.closeMobileMenu();
    this.activeHomeSection.set(item.scrollTarget ? 'offer' : 'home');
    this.scrollToSection(item.scrollTarget);
  }

  protected isNavItemActive(item: { path: string; scrollTarget?: string }): boolean {
    const currentPath = this.router.url.split(/[?#]/, 1)[0];

    if (item.scrollTarget) {
      return currentPath === '/' && this.activeHomeSection() === 'offer';
    }

    if (item.path === '/') {
      return currentPath === '/' && this.activeHomeSection() === 'home';
    }

    return currentPath === item.path;
  }

  protected scrollToSection(id?: string): void {
    if (!id || !isPlatformBrowser(this.platformId)) return;

    const doScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const header = document.querySelector<HTMLElement>('.site-header');
      const offset = (header?.offsetHeight ?? 80) + 20;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    if (this.router.url === '/') {
      doScroll();
    } else {
      this.router.navigate(['/']).then(() => setTimeout(doScroll, 150));
    }
  }

  protected isDarkMode(): boolean {
    const manual = this.darkModeManual();
    return manual !== null ? manual : this.timeOfDay() > 0.72;
  }

  protected footerTime(): number {
    // Tryb nocny → moonlit (t=1.0), tryb dzienny → paleta brandowa fiolet (t=0.35)
    return this.isDarkMode() ? 1.0 : 0.35;
  }

  protected toggleDarkMode(): void {
    this.darkModeManual.set(!this.isDarkMode());
  }

  protected openCookiePreferences(): void {
    this.cookieConsent.openPreferences();
  }

  protected scrollHomeToTop(): void {
    this.closeMobileMenu();
    this.activeHomeSection.set('home');

    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  protected pageBackground(): string {
    return this.themeColor([248, 250, 252], [18, 24, 40]);
  }

  protected themeColor(light: number[], dark: number[]): string {
    const rgb = this.isDarkMode() ? dark : light;
    return `rgb(${rgb.join(', ')})`;
  }
}
