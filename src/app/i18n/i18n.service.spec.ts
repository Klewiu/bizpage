import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  it('detects a German regional browser language', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('de-DE');
    const service = TestBed.inject(I18nService);
    expect(service.locale()).toBe('de');
    expect(document.documentElement.lang).toBe('de');
    expect(service.t('menu.contact')).toBe('Kontakt');
  });

  it('keeps English as the fallback for unsupported browser languages', () => {
    spyOnProperty(navigator, 'language', 'get').and.returnValue('fr-FR');
    expect(TestBed.inject(I18nService).locale()).toBe('en');
  });
});
