import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-offer-page',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="page-shell">
      <h1>{{ t('offer.title') }}</h1>
      <p>{{ t('offer.lead') }}</p>
      <ul>
        <li *ngFor="let item of items">{{ t(item) }}</li>
      </ul>
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
        max-width: 55ch;
        color: rgb(27 27 30 / 0.82);
      }

      .page-shell ul {
        margin-top: 1.5rem;
        display: grid;
        gap: 0.8rem;
      }

      .page-shell li {
        border-radius: 0.9rem;
        border: 1px solid rgb(55 63 81 / 0.2);
        background: rgb(216 219 226 / 0.75);
        padding: 0.85rem 1rem;
      }
    `
  ]
})
export class OfferPageComponent {
  private readonly i18n = inject(I18nService);

  readonly items = ['offer.item1', 'offer.item2', 'offer.item3', 'offer.item4'];

  t(key: string): string {
    return this.i18n.t(key);
  }
}
