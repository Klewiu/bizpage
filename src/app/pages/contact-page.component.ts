import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  template: `
    <section class="page-shell">
      <h1>{{ t('contact.title') }}</h1>
      <p>{{ t('contact.body') }}</p>
      <a href="mailto:hello@wickywave.wicky">{{ t('contact.cta') }}</a>
    </section>
  `,
  styles: [
    `
      .page-shell {
        margin: 0 auto;
        max-width: 72rem;
        padding: 3rem 1.5rem 6rem;
      }

      .page-shell h1 {
        font-size: 2.25rem;
        font-weight: 800;
        color: #0F172A;
      }

      .page-shell p {
        margin-top: 0.8rem;
        max-width: 60ch;
        color: #475569;
        line-height: 1.7;
      }

      .page-shell a {
        margin-top: 1.75rem;
        display: inline-block;
        border-radius: 0.5rem;
        background: #4F46E5;
        padding: 0.75rem 1.5rem;
        color: #ffffff;
        font-weight: 600;
        font-size: 0.95rem;
        text-decoration: none;
        transition: background 150ms ease;
      }

      .page-shell a:hover {
        background: #4338CA;
      }
    `
  ]
})
export class ContactPageComponent {
  private readonly i18n = inject(I18nService);

  t(key: string): string {
    return this.i18n.t(key);
  }
}
