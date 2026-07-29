import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { I18nService } from '../i18n/i18n.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  template: `
    <section class="page-shell" [class.image-ready]="imageLoaded()">
      <div class="computer-scene">
        <picture [class.is-loaded]="imageLoaded()">
          <source media="(min-width: 768px)" srcset="/computer%20large.webp" />
          <img
            #computerImage
            src="/computer.webp"
            alt=""
            width="1152"
            height="2048"
            fetchpriority="high"
            (load)="markImageLoaded()"
          />
        </picture>

        @if (showLoader()) {
          <div class="image-loader" role="status">
            <span>{{ t('contact.loading') }}</span>
            <span class="loader-bars" aria-hidden="true">
              <i></i><i></i><i></i>
            </span>
          </div>
        }

        <div
          class="screen-copy"
          [class.is-loaded]="imageLoaded()"
          aria-live="polite"
        >
          <span class="terminal-line line-1">{{ t('contact.title') }}</span>
          <span class="terminal-line line-2">{{ t('contact.prompt') }}</span>
          <a class="terminal-line line-3" href="mailto:hello@wickywave.wicky">
            hello&#64;wickywave.wicky
          </a>
          <span class="terminal-line line-4">
            {{ t('contact.reply') }}
            <span class="terminal-cursor" aria-hidden="true"></span>
          </span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 100%;
      overflow-x: clip;
    }

    .page-shell {
      position: relative;
      isolation: isolate;
      width: 100%;
      margin: 0 auto;
      max-width: 80rem;
      padding: 2rem 1rem 4rem;
    }

    .page-shell::before {
      content: '';
      position: absolute;
      inset: 4% -3% 5%;
      z-index: -1;
      border-radius: 38% 62% 45% 55% / 55% 42% 58% 45%;
      background:
        radial-gradient(circle at 22% 28%, rgba(196, 181, 253, 0.72), transparent 38%),
        radial-gradient(circle at 78% 34%, rgba(129, 140, 248, 0.52), transparent 42%),
        radial-gradient(circle at 52% 82%, rgba(167, 139, 250, 0.48), transparent 45%);
      filter: blur(26px);
      opacity: 0;
      transform: rotate(-1.5deg);
      pointer-events: none;
    }

    .page-shell.image-ready::before {
      opacity: 0.85;
    }

    .computer-scene {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 100%;
      aspect-ratio: 9 / 16;
      overflow: hidden;
      border-radius: 1rem;
      box-shadow: 0 24px 60px -28px rgba(15, 23, 42, 0.45);
      background: rgba(224, 231, 255, 0.72);
    }

    picture,
    picture img {
      display: block;
      width: 100%;
      height: 100%;
    }

    picture {
      visibility: hidden;
    }

    picture.is-loaded {
      visibility: visible;
    }

    picture img {
      object-fit: cover;
    }

    .image-loader {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      color: #4338CA;
      font-size: clamp(0.85rem, 2.4vw, 1.1rem);
      font-weight: 700;
      letter-spacing: 0.04em;
      background:
        radial-gradient(circle at 30% 35%, rgba(196, 181, 253, 0.5), transparent 38%),
        rgba(238, 242, 255, 0.9);
    }

    .loader-bars {
      display: inline-flex;
      align-items: center;
      gap: 0.2rem;
      height: 1.1rem;
    }

    .loader-bars i {
      display: block;
      width: 0.28rem;
      height: 1rem;
      border-radius: 1px;
      background: #4F46E5;
      animation: loader-blink 900ms step-end infinite;
    }

    .loader-bars i:nth-child(2) {
      animation-delay: 150ms;
    }

    .loader-bars i:nth-child(3) {
      animation-delay: 300ms;
    }

    @keyframes loader-blink {
      0%, 35% { opacity: 1; }
      36%, 100% { opacity: 0.18; }
    }

    .screen-copy {
      position: absolute;
      top: 17.2%;
      left: 3%;
      width: 79%;
      height: 46.8%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: clamp(0.35rem, 1.5vw, 1rem);
      overflow: hidden;
      padding: 7%;
      color: #172554;
      font-family: 'Inter', system-ui, sans-serif;
      visibility: hidden;
    }

    .screen-copy.is-loaded {
      visibility: visible;
    }

    .terminal-line {
      display: block;
      max-width: 100%;
      white-space: normal;
      overflow-wrap: normal;
      word-break: keep-all;
      hyphens: none;
      font-size: clamp(0.64rem, 2.5vw, 1.15rem);
      line-height: 1.35;
      letter-spacing: 0.01em;
      opacity: 1;
      clip-path: none;
      transform: none;
      animation: none !important;
      transition: none !important;
    }

    .line-1 {
      font-size: clamp(1rem, 4.2vw, 2rem);
      font-weight: 800;
      color: #0F172A;
    }

    .line-2 {
      font-weight: 600;
    }

    .line-3 {
      color: #4F46E5;
      font-weight: 700;
      overflow-wrap: anywhere;
      word-break: break-word;
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 0.2em;
    }

    .line-4 {
      color: #475569;
    }

    .terminal-cursor {
      display: inline-block;
      width: 0.34em;
      height: 1.05em;
      margin-left: 0.2em;
      border-radius: 1px;
      background: #4F46E5;
      vertical-align: -0.18em;
      animation: cursor-blink 750ms step-end infinite;
    }

    @keyframes cursor-blink {
      50% { opacity: 0; }
    }

    @media (min-width: 768px) {
      .page-shell {
        padding: 3rem 1.5rem 6rem;
      }

      .page-shell::before {
        inset: 2% -5% 7%;
        filter: blur(40px);
      }

      .computer-scene {
        aspect-ratio: 3 / 2;
      }

      .screen-copy {
        top: 17.5%;
        left: 24%;
        width: 57%;
        height: 47.8%;
        gap: clamp(0.45rem, 1vw, 0.9rem);
        padding: 5%;
      }

      .terminal-line {
        font-size: clamp(0.8rem, 1.35vw, 1.2rem);
        white-space: nowrap;
        overflow-wrap: normal;
      }

      .line-1 {
        font-size: clamp(1.25rem, 2.5vw, 2.3rem);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .loader-bars i {
        animation: none;
      }

      .terminal-cursor {
        animation: none;
      }
    }
  `]
})
export class ContactPageComponent implements AfterViewInit, OnDestroy {
  private readonly i18n = inject(I18nService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private desktopMedia?: MediaQueryList;

  @ViewChild('computerImage', { static: true })
  private readonly computerImage!: ElementRef<HTMLImageElement>;

  protected readonly imageLoaded = signal(false);
  protected readonly showLoader = signal(false);

  t(key: string): string {
    return this.i18n.t(key);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.desktopMedia = window.matchMedia('(min-width: 768px)');
    this.desktopMedia.addEventListener('change', this.handleResponsiveImageChange);

    const image = this.computerImage.nativeElement;
    if (image.complete && image.naturalWidth > 0) {
      this.imageLoaded.set(true);
    } else {
      this.showLoader.set(true);
    }
  }

  ngOnDestroy(): void {
    this.desktopMedia?.removeEventListener('change', this.handleResponsiveImageChange);
  }

  protected async markImageLoaded(): Promise<void> {
    if (!this.isBrowser) return;

    const image = this.computerImage.nativeElement;
    const loadedSource = image.currentSrc;
    try {
      await image.decode();
    } catch {
      // A completed image may reject decode in some older browsers.
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (image.currentSrc === loadedSource) {
          this.imageLoaded.set(true);
          this.showLoader.set(false);
        }
      });
    });
  }

  private readonly handleResponsiveImageChange = (): void => {
    this.imageLoaded.set(false);
    this.showLoader.set(true);
    requestAnimationFrame(() => {
      const image = this.computerImage.nativeElement;
      if (image.complete && image.naturalWidth > 0) {
        this.imageLoaded.set(true);
        this.showLoader.set(false);
      }
    });
  };
}
