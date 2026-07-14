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
        color: #373f51;
      }

      .page-shell p {
        margin-top: 0.8rem;
        max-width: 60ch;
        color: rgb(27 27 30 / 0.82);
      }

      .page-shell a {
        margin-top: 1.5rem;
        display: inline-block;
        border-radius: 9999px;
        background: #58a4b0;
        padding: 0.75rem 1.2rem;
        color: #1b1b1e;
        font-weight: 700;
        text-decoration: none;
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
