import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-news-page',
  standalone: true,
  template: `
    <section class="page-shell">
      <h1>{{ t('news.title') }}</h1>
      <p>{{ t('news.body') }}</p>
      <div class="news-grid">
        <article>{{ t('news.card1') }}</article>
        <article>{{ t('news.card2') }}</article>
        <article>{{ t('news.card3') }}</article>
      </div>
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
        color: rgb(27 27 30 / 0.82);
      }

      .news-grid {
        margin-top: 1.5rem;
        display: grid;
        gap: 1rem;
      }

      .news-grid article {
        border-radius: 1rem;
        border: 1px solid rgb(88 164 176 / 0.35);
        background: linear-gradient(130deg, rgb(169 188 208 / 0.2), rgb(216 219 226 / 0.8));
        padding: 1.1rem;
        font-weight: 600;
        color: #1b1b1e;
      }

      @media (min-width: 768px) {
        .news-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
    `
  ]
})
export class NewsPageComponent {
  private readonly i18n = inject(I18nService);

  t(key: string): string {
    return this.i18n.t(key);
  }
}
