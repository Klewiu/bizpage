import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  template: `
    <div class="bg-stripes" aria-hidden="true"><span></span><span></span></div>
    <!-- SEKCJA: Kontakt – lekka, szybka wersja bez ciężkich grafik -->
    <section class="page-shell contact-shell">
      <div class="contact-card">
        <p class="eyebrow">{{ t('contact.title') }}</p>
        <h2 class="contact-heading">{{ t('contact.prompt') }}</h2>

        <div class="contact-actions">
        <a class="contact-email" href="mailto:kontakt@wickywave.pl">
          <svg
            class="contact-email-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="3" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <span>kontakt&#64;wickywave.pl</span>
        </a>

        <a class="contact-email" href="tel:+48516551316">
          <svg class="contact-email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>516 551 316</span>
        </a>

        <a class="contact-email" href="tel:+48500083971">
          <svg class="contact-email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>500 083 971</span>
        </a>
        </div>

        <div class="company-details">
          <h3>{{ t('contact.companyDetails') }}</h3>
          <p>Wicky Wave Sp. z o.o.</p>
          <p>ul. Ezopa 57, 04-805 Warszawa</p>
          <p>{{ t('contact.taxId') }}: 9522290935</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .contact-shell {
      margin: 0 auto;
      max-width: 72rem;
      padding: 3rem 1.5rem 6rem;
    }

    .contact-card {
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 1.5rem;
      background: #ffffff;
      padding: 2.25rem 1rem;
      text-align: center;
      box-shadow: 0 20px 45px -30px rgba(15, 23, 42, 0.35);
      transition: background-color 300ms ease;
    }

    .eyebrow {
      margin: 0;
      color: #7C3AED;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .contact-heading {
      margin: 0.6rem auto 0;
      max-width: 32ch;
      font-size: clamp(1.35rem, 3.4vw, 2rem);
      font-weight: 800;
      line-height: 1.25;
      color: #0F172A;
      transition: color 300ms ease;
    }

    .contact-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1.75rem;
      width: 100%;
      min-width: 0;
    }

    .contact-email {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      max-width: 100%;
      box-sizing: border-box;
      border-radius: 9999px;
      padding: 0.9rem 1.1rem;
      background: rgba(124, 58, 237, 0.1);
      color: #7C3AED;
      font-size: clamp(0.8rem, 4vw, 1.3rem);
      font-weight: 700;
      text-decoration: none;
      white-space: nowrap;
      transition: background-color 180ms ease;
    }

    .contact-email:hover {
      background: rgba(124, 58, 237, 0.18);
    }

    .contact-email:focus {
      outline: none;
    }

    .contact-email:focus-visible {
      outline: 3px solid rgba(124, 58, 237, 0.45);
      outline-offset: 3px;
    }

    .contact-email-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .company-details {
      margin: 2rem auto 0;
      padding-top: 1.5rem;
      border-top: 1px solid #e2e8f0;
      color: #475569;
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .company-details h3 {
      margin: 0 0 0.5rem;
      color: #0F172A;
      font-size: 0.95rem;
      font-weight: 700;
    }

    .company-details p {
      margin: 0.2rem 0;
    }

    @media (min-width: 768px) {
      .contact-actions {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
      }

      .contact-shell {
        padding: 4rem 1.5rem 7rem;
      }

      .contact-card {
        padding: 3.5rem 3rem;
      }
    }
  `]
})
export class ContactPageComponent {
  private readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.updateTags({
      title: this.t('seo.contact.title'),
      description: this.t('seo.contact.description')
    });

    this.seo.setJsonLd('contactpage', {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: this.t('seo.contact.title'),
      description: this.t('seo.contact.description')
    });
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}
