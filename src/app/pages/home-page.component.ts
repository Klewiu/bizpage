import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  template: `
    <section class="mx-auto max-w-6xl px-6 pb-12 pt-10 md:px-10 md:pt-16">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{{ t('home.eyebrow') }}</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-ink md:text-6xl">{{ t('home.title') }}</h1>
      <p class="mt-5 max-w-2xl text-lg text-ink/65">{{ t('home.subtitle') }}</p>
    </section>

    <section class="mx-auto max-w-6xl px-6 pb-10 md:px-10">
      <div class="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        <article class="hook-card snap-center">
          <h2>{{ t('home.hook.readiness.title') }}</h2>
          <p>{{ t('home.hook.readiness.body') }}</p>
        </article>
        <article class="hook-card snap-center">
          <h2>{{ t('home.hook.frustration.title') }}</h2>
          <p>{{ t('home.hook.frustration.body') }}</p>
        </article>
        <article class="hook-card snap-center">
          <h2>{{ t('home.hook.process.title') }}</h2>
          <p>{{ t('home.hook.process.body') }}</p>
        </article>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div class="rounded-2xl border border-ink/10 bg-ink p-8 text-slate-100 shadow-elevated md:p-12">
        <h2 class="text-3xl font-bold">{{ t('home.process.title') }}</h2>
        <p class="mt-3 max-w-3xl text-slate-300">{{ t('home.process.body') }}</p>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div class="step-tile">01 · {{ t('home.process.step1') }}</div>
          <div class="step-tile">02 · {{ t('home.process.step2') }}</div>
          <div class="step-tile">03 · {{ t('home.process.step3') }}</div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hook-card {
        min-width: min(85vw, 22rem);
        border-radius: 1rem;
        border: 1px solid #E2E8F0;
        background: #FFFFFF;
        padding: 1.5rem;
        box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.07);
      }

      .hook-card h2 {
        font-size: 1.15rem;
        font-weight: 700;
        color: #0F172A;
      }

      .hook-card p {
        margin-top: 0.6rem;
        color: #475569;
        line-height: 1.65;
        font-size: 0.95rem;
      }

      .step-tile {
        border-radius: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 1rem;
        font-weight: 600;
        font-size: 0.9rem;
        background: rgba(255, 255, 255, 0.06);
        color: #E2E8F0;
      }
    `
  ]
})
export class HomePageComponent {
  private readonly i18n = inject(I18nService);

  t(key: string): string {
    return this.i18n.t(key);
  }
}
