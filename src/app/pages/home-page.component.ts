import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  template: `
    <section class="mx-auto max-w-6xl px-6 pb-12 pt-10 md:px-10 md:pt-16">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-pacific">{{ t('home.eyebrow') }}</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-black leading-tight text-charcoal md:text-6xl">{{ t('home.title') }}</h1>
      <p class="mt-5 max-w-2xl text-lg text-charcoal/80">{{ t('home.subtitle') }}</p>
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
      <div class="rounded-3xl border border-charcoal/15 bg-charcoal p-8 text-alabaster shadow-soft md:p-12">
        <h2 class="text-3xl font-bold">{{ t('home.process.title') }}</h2>
        <p class="mt-3 max-w-3xl text-alabaster/90">{{ t('home.process.body') }}</p>
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
        border-radius: 1.25rem;
        border: 1px solid rgb(55 63 81 / 0.2);
        background: linear-gradient(155deg, rgb(216 219 226 / 0.95), rgb(169 188 208 / 0.85));
        padding: 1.5rem;
        box-shadow: 0 20px 50px -30px rgba(27, 27, 30, 0.4);
      }

      .hook-card h2 {
        font-size: 1.25rem;
        font-weight: 800;
        color: #1b1b1e;
      }

      .hook-card p {
        margin-top: 0.65rem;
        color: rgb(27 27 30 / 0.82);
        line-height: 1.6;
      }

      .step-tile {
        border-radius: 0.9rem;
        border: 1px solid rgb(169 188 208 / 0.25);
        padding: 1rem;
        font-weight: 600;
        background: rgb(27 27 30 / 0.35);
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
