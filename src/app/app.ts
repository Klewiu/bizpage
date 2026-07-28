import { NgFor } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { I18nService } from './i18n/i18n.service';
import type { Locale } from './i18n/translations';
import { OceanBannerComponent } from './ocean-banner.component';

@Component({
  selector: 'app-root',
  imports: [NgFor, RouterLink, RouterLinkActive, RouterOutlet, OceanBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly i18n = inject(I18nService);

  protected readonly isMobileMenuOpen = signal(false);
  protected readonly timeOfDay = signal(0.28);

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

  protected setTimeOfDay(time: number): void {
    this.timeOfDay.set(time);
  }

  protected pageBackground(): string {
    return this.themeColor([248, 250, 252], [18, 24, 40]);
  }

  protected themeColor(light: number[], dark: number[]): string {
    const amount = Math.max(0, Math.min(1, (this.timeOfDay() - 0.45) / 0.55));
    const rgb = light.map((value, index) => Math.round(value + (dark[index] - value) * amount));
    return `rgb(${rgb.join(', ')})`;
  }
}
