import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { I18nService } from './i18n/i18n.service';

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

  it('should render the brand logo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector<HTMLImageElement>('img[src="/wickylogoline.png"]');
    expect(logo?.alt).toBe('WickyWave Software');
  });

  it('switches to German from both language menus', () => {
    const fixture = TestBed.createComponent(App);
    const i18n = TestBed.inject(I18nService);
    i18n.setLocale('pl');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const germanButtons = Array.from(compiled.querySelectorAll('button')).filter(button => button.textContent?.trim() === 'DE');
    expect(germanButtons.length).toBe(2);
    germanButtons[0].click();
    fixture.detectChanges();
    expect(i18n.locale()).toBe('de');
    expect(document.documentElement.lang).toBe('de');
    expect(compiled.textContent).toContain('Aktive SaaS-Produkte');
    i18n.setLocale('en');
    fixture.detectChanges();
    germanButtons[1].click();
    fixture.detectChanges();
    expect(i18n.locale()).toBe('de');
    expect(compiled.textContent).toContain('Datenschutzerklärung');
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
