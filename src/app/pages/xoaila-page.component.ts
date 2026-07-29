import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-xoaila-page',
  standalone: true,
  imports: [NgFor],
  template: `
    <!-- SEKCJA: Xoaila – opis produktu SaaS + lista punktów -->
    <section class="page-shell">
      <p>{{ t('xoaila.body') }}</p>

      <ul>
        <li *ngFor="let point of points">{{ t(point) }}</li>
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
        color: #0F172A;
      }

      .page-shell p {
        margin-top: 0.8rem;
        max-width: 68ch;
        color: #475569;
        line-height: 1.75;
      }

      .page-shell ul {
        margin-top: 1.4rem;
        display: grid;
        gap: 0.75rem;
      }

      .page-shell li {
        border-radius: 0.75rem;
        border: 1px solid #E2E8F0;
        background: #FFFFFF;
        padding: 0.9rem 1.1rem;
        font-weight: 500;
        color: #334155;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
    `
  ]
})
export class XoailaPageComponent {
  private readonly i18n = inject(I18nService);

  readonly points = ['xoaila.point1', 'xoaila.point2', 'xoaila.point3'];

  t(key: string): string {
    return this.i18n.t(key);
  }
}
