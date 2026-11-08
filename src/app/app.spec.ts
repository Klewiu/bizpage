import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('publishes the company structured data', () => {
    TestBed.createComponent(App);
    const script = document.querySelector<HTMLScriptElement>('#jsonld-organization');
    expect(script?.type).toBe('application/ld+json');
    const data = JSON.parse(script?.textContent ?? '{}');
    expect(data['@type']).toBe('Corporation');
    expect(data['@id']).toBe('https://wickywave.pl/#organization');
    expect(data.legalName).toBe('WICKY WAVE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ');
    expect(data.address.addressLocality).toBe('Warszawa');
    expect(data.address.addressCountry).toBe('PL');
    expect(data.areaServed.name).toBe('Poland');
  });

  it('should render the brand logo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector<HTMLImageElement>('img[src="/wickylogoline.png"]');
    expect(logo?.alt).toBe('WickyWave Software');
  });

  it('should switch page and card colors together with the theme from either menu', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const shell = compiled.querySelector<HTMLElement>('.app-shell')!;
    const buttons = compiled.querySelectorAll<HTMLButtonElement>('button[aria-pressed]');

    expect(buttons.length).toBe(2);
    expect(shell.classList.contains('night-theme')).toBeFalse();
    expect(shell.style.getPropertyValue('--page-background')).toBe('rgb(248, 250, 252)');
    expect(shell.style.getPropertyValue('--card-background')).toBe('rgb(255, 255, 255)');

    buttons[0].click();
    fixture.detectChanges();
    expect(shell.classList.contains('night-theme')).toBeTrue();
    expect(shell.style.getPropertyValue('--page-background')).toBe('rgb(18, 24, 40)');
    expect(shell.style.getPropertyValue('--card-background')).toBe('rgb(30, 41, 59)');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');

    buttons[1].click();
    fixture.detectChanges();
    expect(shell.classList.contains('night-theme')).toBeFalse();
    expect(shell.style.getPropertyValue('--page-background')).toBe('rgb(248, 250, 252)');
    expect(shell.style.getPropertyValue('--card-background')).toBe('rgb(255, 255, 255)');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
  });
});
