import { Component, OnDestroy, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-shell not-found">
      <p class="error-code">404</p>
      <h1>{{ t('notFound.title') }}</h1>
      <p>{{ t('notFound.body') }}</p>
      <a routerLink="/">{{ t('notFound.home') }}</a>
    </section>
  `,
  styles: [`
    .not-found {
      margin: 0 auto;
      max-width: 60rem;
      padding: 5rem 1.5rem 7rem;
      text-align: center;
    }
    .not-found .error-code {
      color: var(--violet-text, #7C3AED);
      font-size: 1rem;
      font-weight: 800;
    }
    h1 {
      margin-top: 0.75rem;
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 800;
    }
    .not-found > p:not(.error-code) {
      margin-top: 1rem;
    }
    a {
      display: inline-block;
      margin-top: 2rem;
      border-radius: 0.625rem;
      background: #4F46E5;
      padding: 0.8rem 1.75rem;
      color: #fff;
      font-weight: 600;
      text-decoration: none;
    }
    a:hover {
      background: #4338CA;
    }
  `]
})
export class NotFoundPageComponent implements OnDestroy {
  private readonly i18n = inject(I18nService);
  private readonly meta = inject(Meta);
  private readonly previousRobots = this.meta.getTag('name="robots"')?.getAttribute('content');

  constructor() {
    inject(Title).setTitle(`404 — ${this.t('notFound.title')} | WickyWave`);
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

  ngOnDestroy(): void {
    if (this.previousRobots !== null && this.previousRobots !== undefined) {
      this.meta.updateTag({ name: 'robots', content: this.previousRobots });
    } else {
      this.meta.removeTag('name="robots"');
    }
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}
