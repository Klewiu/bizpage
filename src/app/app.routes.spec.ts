import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { ContactPageComponent } from './pages/contact-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page.component';
import { PrivacyPageComponent } from './pages/privacy-page.component';
import { XoailaPageComponent } from './pages/xoaila-page.component';
import { I18nService } from './i18n/i18n.service';

describe('Published routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('shows the LinkedIn link on the contact page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/contact', ContactPageComponent);
    const link = harness.routeNativeElement?.querySelector<HTMLAnchorElement>('a[href="https://www.linkedin.com/company/wicky-wave-sp-z-o-o"]');
    expect(link).toBeTruthy();
    expect(link?.target).toBe('_blank');
    expect(link?.rel).toContain('noopener');
    expect(link?.querySelector('svg')).toBeTruthy();
  });

  it('shows 404 for removed and unknown routes and restores robots on navigation', async () => {
    const harness = await RouterTestingHarness.create();
    const meta = TestBed.inject(Meta);
    meta.updateTag({ name: 'robots', content: 'index, follow' });

    for (const path of ['/offer', '/about-us', '/news', '/missing-page']) {
      await harness.navigateByUrl(path, NotFoundPageComponent);
      expect(harness.routeNativeElement?.textContent).toContain('404');
      expect(meta.getTag('name="robots"')?.content).toBe('noindex, follow');
    }

    await harness.navigateByUrl('/', HomePageComponent);
    expect(meta.getTag('name="robots"')?.content).toBe('index, follow');
  });

  it('sets the homepage canonical and keywords, then clears homepage keywords on other pages', async () => {
    const harness = await RouterTestingHarness.create();
    const meta = TestBed.inject(Meta);

    await harness.navigateByUrl('/', HomePageComponent);
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://wickywave.pl/');
    expect(meta.getTag('name="keywords"')?.content).toContain('tworzenie oprogramowania');

    await harness.navigateByUrl('/contact', ContactPageComponent);
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://wickywave.pl/contact');
    expect(meta.getTag('name="keywords"')).toBeNull();
  });

  it('links from the homepage SaaS tab to the product page in both languages', async () => {
    const i18n = TestBed.inject(I18nService);
    i18n.setLocale('pl');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', HomePageComponent);

    const link = harness.routeNativeElement!.querySelector<HTMLAnchorElement>('a[href="/aktywne-saas"]')!;
    expect(link.textContent).toContain('Nasze produkty SaaS');
    expect(link.textContent).toContain('Sprawdź je');
    i18n.setLocale('en');
    harness.detectChanges();
    expect(link.textContent).toContain('Our SaaS products');
    expect(link.textContent).toContain('Explore them');

    link.click();
    await harness.fixture.whenStable();
    expect(harness.routeNativeElement?.querySelectorAll('.saas-card').length).toBe(2);
  });

  it('uses a privacy-specific title and canonical URL', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/privacy-policy', PrivacyPageComponent);

    expect(TestBed.inject(Title).getTitle()).toContain('Polityka prywatności');
    expect(TestBed.inject(Title).getTitle()).not.toContain('dedykowane aplikacje webowe');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href)
      .toBe('https://wickywave.pl/privacy-policy');
  });

  it('shows Mid-Grator before the upcoming Xoaila in both languages', async () => {
    const i18n = TestBed.inject(I18nService);
    i18n.setLocale('pl');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/aktywne-saas', XoailaPageComponent);

    const sections = harness.routeNativeElement!.querySelectorAll('section');
    expect(sections.length).toBe(2);
    expect(sections[0].classList.contains('saas-card')).toBeTrue();
    expect(sections[1].classList.contains('saas-card')).toBeTrue();
    const link = sections[0].querySelector<HTMLAnchorElement>('a');
    expect(link?.href).toBe('https://midgrator.pl/');
    expect(link?.querySelector('img')?.getAttribute('src')).toBe('/mid-grator-logo.jpg');
    expect(link?.querySelector('img')?.alt).toBe('Mid-Grator');
    expect(sections[0].textContent).toContain('aktywny produkt SaaS');
    expect(sections[0].querySelectorAll('li').length).toBe(3);
    const visit = sections[0].querySelector<HTMLAnchorElement>('a.service-button');
    expect(visit?.href).toBe('https://midgrator.pl/');
    expect(visit?.textContent?.trim()).toBe('PRZEJDŹ DO SERWISU');
    expect(sections[1].textContent).toContain('xoaila');
    const soon = sections[1].querySelector<HTMLButtonElement>('button.service-button');
    expect(soon?.disabled).toBeTrue();
    expect(soon?.textContent?.trim()).toBe('START USŁUGI WKRÓTCE');
    expect(sections[1].textContent).not.toContain('Usługa będzie dostępna wkrótce.');
    expect(TestBed.inject(Title).getTitle()).toContain('Mid-Grator');

    i18n.setLocale('en');
    harness.detectChanges();
    expect(sections[0].textContent).toContain('active SaaS product');
    expect(visit?.textContent?.trim()).toBe('VISIT THE SERVICE');
    expect(soon?.textContent?.trim()).toBe('SERVICE LAUNCHING SOON');
  });
});
