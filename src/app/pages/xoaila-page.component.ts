import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-xoaila-page',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="page-shell">
      <h1>{{ t('xoaila.title') }}</h1>
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
        color: #373f51;
      }

      .page-shell p {
        margin-top: 0.8rem;
        max-width: 68ch;
        color: rgb(27 27 30 / 0.85);
        line-height: 1.65;
      }

      .page-shell ul {
        margin-top: 1.4rem;
        display: grid;
        gap: 0.9rem;
      }

      .page-shell li {
        border-radius: 0.9rem;
        border: 1px solid rgb(88 164 176 / 0.35);
        background: rgb(216 219 226 / 0.62);
        padding: 0.85rem 1rem;
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
