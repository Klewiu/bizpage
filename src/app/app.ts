import { NgFor } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { I18nService } from './i18n/i18n.service';
import type { Locale } from './i18n/translations';

@Component({
  selector: 'app-root',
  imports: [NgFor, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly i18n = inject(I18nService);

  protected readonly isMobileMenuOpen = signal(false);

  protected readonly navItems = [
    { path: '/home', label: 'menu.home' },
    { path: '/offer', label: 'menu.offer' },
    { path: '/about-us', label: 'menu.about' },
    { path: '/news', label: 'menu.news' },
    { path: '/aktywne-saas', label: 'menu.activeSaas' },
    { path: '/contact', label: 'menu.contact' }
  ];

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
}
