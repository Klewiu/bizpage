import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnDestroy,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { I18nService } from './i18n/i18n.service';

type RGB = [number, number, number];

interface Palette {
  t: number;
  name: string;
  skyTop: RGB;
  skyHorizon: RGB;
  sun: RGB;
  waterFar: RGB;
  waterNear: RGB;
  foam: RGB;
  sunHeight: number;
  stars: number;
}

@Component({
  selector: 'app-ocean-banner',
  standalone: true,
  template: `
    <section
      class="ocean-scene"
      [class.footer-scene]="decorative"
      [attr.aria-label]="decorative ? null : 'Interactive ocean at different times of day'"
      [attr.aria-hidden]="decorative ? 'true' : null"
    >
      <canvas #ocean aria-hidden="true"></canvas>

      @if (!decorative) {
      <div class="ocean-ui">
        <div class="mood" aria-live="polite">
          <span class="mood-name">{{ t('ocean.mood.' + moodName) }}</span>
        </div>

        <div class="controls">
          <p>{{ t('ocean.tagline') }}</p>
          <label class="slider-wrap">
            <span>{{ t('ocean.mood.dawn') }}</span>
            <input
              type="range"
              min="0"
              max="1000"
              [value]="timeOfDay * 1000"
              (input)="setTime($event)"
              aria-label="Time of day"
            />
            <span>{{ t('ocean.mood.moonlit') }}</span>
          </label>
        </div>
      </div>
      }
    </section>
  `,
  styles: [`
    :host { display: block; }

    .ocean-scene {
      position: relative;
      height: clamp(140px, 16vw, 200px);
      min-height: 140px;
      overflow: hidden;
      background: #28305c;
      color: white;
    }

    .footer-scene {
      height: 100%;
      min-height: 0;
    }

    canvas {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
    }

    .ocean-ui {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      padding: 24px 32px 22px;
      pointer-events: none;
    }

    .mood {
      text-align: right;
      text-shadow: 0 1px 12px rgba(0, 0, 0, 0.45);
    }

    .mood span { display: block; }

    .mood-name {
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.3em;
    }

    .controls {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .controls p {
      margin: 0;
      font-family: inherit;
      font-size: clamp(1.05rem, 2.6vw, 1.75rem);
      font-weight: 500;
      text-align: center;
      text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
    }

    .slider-wrap {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 14px;
      width: min(440px, 88vw);
      padding: 11px 17px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 999px;
      background: rgba(10, 16, 28, 0.34);
      backdrop-filter: blur(12px);
    }

    .slider-wrap span {
      font-size: 0.58rem;
      letter-spacing: 0.18em;
      opacity: 0.7;
    }

    input {
      appearance: none;
      flex: 1;
      height: 3px;
      border-radius: 3px;
      outline: none;
      cursor: grab;
      background: linear-gradient(90deg, #3a4a8a, #6fa8d4 25%, #ffd27f 55%, #ff7e54 78%, #1a2244);
    }

    input:active { cursor: grabbing; }

    input::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      border: 2px solid rgba(0, 0, 0, 0.15);
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35), 0 0 0 6px rgba(255, 255, 255, 0.12);
    }

    input::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(0, 0, 0, 0.15);
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
    }

    @media (max-width: 600px) {
      .ocean-ui { padding: 18px 16px; }
      .slider-wrap { gap: 9px; padding-inline: 13px; }
    }
  `]
})
export class OceanBannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ocean', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() readonly timeChange = new EventEmitter<number>();
  @Input() decorative = false;
  @Input() set time(value: number | undefined) {
    if (value === undefined) return;
    this.timeOfDay = value;
    this.moodName = this.palette().name;
  }

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly i18n = inject(I18nService);
  private readonly zone = inject(NgZone);

  protected timeOfDay = 0.28;
  protected moodName = 'morning';

  private ctx?: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private horizon = 0;
  private animationFrame = 0;
  private elapsed = 0;
  private resizeObserver?: ResizeObserver;

  private readonly stars = Array.from({ length: 100 }, () => ({
    x: Math.random(), y: Math.random() * 0.85, r: Math.random() * 1.1 + 0.25, phase: Math.random() * Math.PI * 2
  }));

  private readonly clouds = Array.from({ length: 5 }, () => ({
    x: Math.random(), y: 0.1 + Math.random() * 0.2, width: 0.16 + Math.random() * 0.2, speed: 0.000012 + Math.random() * 0.000018
  }));

  private readonly palettes: Palette[] = [
    { t: 0,    name: 'dawn',     skyTop: [38, 44, 86],   skyHorizon: [247, 176, 128], sun: [255, 238, 206], waterFar: [176, 150, 150], waterNear: [34, 62, 84],   foam: [255, 244, 234], sunHeight: 0.1,  stars: 0 },
    { t: 0.28, name: 'morning',  skyTop: [64, 134, 206], skyHorizon: [188, 222, 236], sun: [255, 255, 246], waterFar: [120, 186, 196], waterNear: [20, 92, 114],  foam: [255, 255, 255], sunHeight: 0.55, stars: 0 },
    // Paleta brandowa – fiolet/indygo korelujący z kolorem logotypu (#4F46E5). Używana w stopce w trybie dziennym.
    { t: 0.35, name: 'brand',    skyTop: [56, 48, 160],  skyHorizon: [120, 108, 220],sun: [220, 215, 255], waterFar: [95, 85, 215],  waterNear: [40, 30, 140], foam: [185, 178, 255], sunHeight: 0.65, stars: 0 },
    { t: 0.5,  name: 'midday',   skyTop: [58, 142, 214], skyHorizon: [176, 216, 230], sun: [255, 255, 248], waterFar: [96, 178, 188],  waterNear: [16, 96, 120],  foam: [255, 255, 255], sunHeight: 0.92, stars: 0 },
    { t: 0.68, name: 'goldenHour', skyTop: [74, 92, 156], skyHorizon: [255, 202, 120], sun: [255, 236, 194], waterFar: [206, 164, 118], waterNear: [34, 78, 98], foam: [255, 244, 228], sunHeight: 0.3, stars: 0 },
    { t: 0.84, name: 'sunset', skyTop: [48, 38, 86], skyHorizon: [255, 108, 68], sun: [255, 206, 148], waterFar: [188, 98, 84], waterNear: [30, 42, 72], foam: [255, 222, 200], sunHeight: 0.06, stars: 0.15 },
    { t: 1, name: 'moonlit', skyTop: [8, 12, 30], skyHorizon: [34, 44, 82], sun: [228, 234, 255], waterFar: [28, 42, 76], waterNear: [6, 16, 32], foam: [196, 208, 234], sunHeight: 0.55, stars: 1 }
  ];

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d') ?? undefined;
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas.parentElement!);
    this.resize();
    this.timeChange.emit(this.timeOfDay);
    this.zone.runOutsideAngular(() => this.draw());
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;

    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver?.disconnect();
  }

  protected setTime(event: Event): void {
    this.timeOfDay = Number((event.target as HTMLInputElement).value) / 1000;
    this.moodName = this.palette().name;
    this.timeChange.emit(this.timeOfDay);
  }

  protected t(key: string): string {
    return this.i18n.t(key);
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.parentElement!.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.horizon = this.height * 0.6;
  }

  private mix(a: RGB, b: RGB, amount: number): RGB {
    return a.map((value, index) => value + (b[index] - value) * amount) as RGB;
  }

  private color(value: RGB, alpha = 1): string {
    return `rgba(${value[0] | 0},${value[1] | 0},${value[2] | 0},${alpha})`;
  }

  private palette(): Palette {
    let index = 0;
    while (index < this.palettes.length - 1 && this.timeOfDay > this.palettes[index + 1].t) index++;
    const a = this.palettes[index];
    const b = this.palettes[Math.min(index + 1, this.palettes.length - 1)];
    const amount = Math.max(0, Math.min(1, (this.timeOfDay - a.t) / (b.t - a.t || 1)));
    return {
      ...a,
      name: amount < 0.5 ? a.name : b.name,
      skyTop: this.mix(a.skyTop, b.skyTop, amount),
      skyHorizon: this.mix(a.skyHorizon, b.skyHorizon, amount),
      sun: this.mix(a.sun, b.sun, amount),
      waterFar: this.mix(a.waterFar, b.waterFar, amount),
      waterNear: this.mix(a.waterNear, b.waterNear, amount),
      foam: this.mix(a.foam, b.foam, amount),
      sunHeight: a.sunHeight + (b.sunHeight - a.sunHeight) * amount,
      stars: a.stars + (b.stars - a.stars) * amount
    };
  }

  private draw = (): void => {
    const ctx = this.ctx;
    if (!ctx || !this.width || !this.height) {
      this.animationFrame = requestAnimationFrame(this.draw);
      return;
    }

    this.elapsed += 0.016;
    const p = this.palette();
    const horizon = this.decorative ? -8 : this.horizon; // dekoracyjny = tylko woda, brak nieba
    const oceanHeight = this.height - horizon;
    const sunX = this.width * 0.5;
    const sunY = horizon - p.sunHeight * horizon * 0.82;

    // ── TRYB DEKORACYJNY (np. stopka) ────────────────────────────
    // Rysuje tylko jednolite tło wody – niebo i słońce są ukryte
    if (this.decorative) {
      ctx.fillStyle = this.color(p.waterFar);
      ctx.fillRect(0, 0, this.width, this.height);
    } else {
      // ── NIEBO ─────────────────────────────────────────────────
      const sky = ctx.createLinearGradient(0, 0, 0, horizon);
      sky.addColorStop(0, this.color(p.skyTop));
      sky.addColorStop(1, this.color(p.skyHorizon));
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, this.width, horizon + 2);

      // ── GWIAZDY (widoczne tylko przy wysokim stars > 0) ────────
      if (p.stars > 0.01) {
        for (const star of this.stars) {
          const twinkle = 0.5 + 0.5 * Math.sin(this.elapsed * 2 + star.phase);
          ctx.fillStyle = this.color([255, 255, 255], p.stars * twinkle);
          ctx.beginPath();
          ctx.arc(star.x * this.width, star.y * horizon, star.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── SŁOŃCE / KSIĘŻYC – poświata i tarcza ──────────────────
      const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, Math.min(this.width, this.height) * 0.42);
      glow.addColorStop(0, this.color(p.sun, 0.5));
      glow.addColorStop(1, this.color(p.sun, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, this.width, horizon);

      ctx.fillStyle = this.color(p.sun);
      ctx.beginPath();
      ctx.arc(sunX, sunY, Math.min(this.width, this.height) * 0.04, 0, Math.PI * 2);
      ctx.fill();

      // ── CHMURY ────────────────────────────────────────────────
      for (const cloud of this.clouds) {
        cloud.x += cloud.speed;
        if (cloud.x > 1.25) cloud.x = -0.25;
        const cloudWidth = cloud.width * this.width;
        ctx.fillStyle = this.color(this.mix(p.skyHorizon, [255, 255, 255], 0.35), 0.15);
        for (let part = 0; part < 4; part++) {
          ctx.beginPath();
          ctx.ellipse(cloud.x * this.width + part * cloudWidth * 0.2, cloud.y * horizon, cloudWidth * 0.25, cloudWidth * 0.055, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // ── FALE OCEANU ───────────────────────────────────────────────
    // 22 warstwy fal od horyzontu do przodu; kolor interpolowany między waterFar i waterNear
    const waveCount = 22;
    for (let wave = 0; wave < waveCount; wave++) {
      const depth = wave / (waveCount - 1);
      const yTop = horizon + Math.pow(depth, 1.85) * oceanHeight;
      const amplitude = 0.5 + depth * 18;
      const wavelength = 48 + depth * 250;
      const phase = this.elapsed * (0.25 + depth * 0.7) + wave * 0.9;
      const waveColor = this.mix(p.waterFar, p.waterNear, depth);

      ctx.beginPath();
      ctx.moveTo(0, this.height);
      for (let x = 0; x <= this.width; x += 6) {
        const y = yTop + Math.sin(x / wavelength + phase) * amplitude + Math.sin(x / (wavelength * 0.42) + phase * 1.6) * amplitude * 0.28;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(this.width, this.height);
      ctx.closePath();
      ctx.fillStyle = this.color(waveColor);
      ctx.fill();

      // grzebień fali (foam)
      ctx.strokeStyle = this.color(this.mix(waveColor, p.foam, 0.5), 0.08 + depth * 0.2);
      ctx.lineWidth = 0.5 + depth * 1.6;
      ctx.stroke();
    }

    // ── POŁYSKI SŁOŃCA NA WODZIE (tylko w trybie głównym) ─────────
    if (!this.decorative) {
      for (let glitter = 0; glitter < 90; glitter++) {
        const depth = Math.random();
        const y = horizon + Math.pow(depth, 1.45) * oceanHeight;
        const spread = 6 + this.width * 0.22 * depth;
        const x = sunX + (Math.random() - 0.5) * spread * 2;
        const alpha = (1 - Math.abs(x - sunX) / spread) * (0.15 + Math.random() * 0.55);
        ctx.fillStyle = this.color(p.sun, Math.max(0, alpha));
        ctx.fillRect(x, y, 1 + Math.random() * 4, 1);
      }
    }

    this.animationFrame = requestAnimationFrame(this.draw);
  };
}
