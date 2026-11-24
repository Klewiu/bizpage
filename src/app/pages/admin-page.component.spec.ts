import { TestBed } from '@angular/core/testing';
import { User } from 'firebase/auth';
import { AdminService, Client } from '../admin/admin.service';
import { AdminPageComponent, isFollowUpDue } from './admin-page.component';

describe('Follow-up reminders', () => {
  it('marks today and earlier dates due, but not future dates or an empty date', () => {
    const now = new Date(2026, 10, 24, 0, 0);
    expect(isFollowUpDue('', now)).toBeFalse();
    expect(isFollowUpDue('2026-11-23', now)).toBeTrue();
    expect(isFollowUpDue('2026-11-24', now)).toBeTrue();
    expect(isFollowUpDue('2026-11-25', now)).toBeFalse();
  });

  describe('Admin panel', () => {
    const client: Client = {
      id: 'client-1', name: 'Klient', company: 'Firma', email: 'test@example.com',
      phone: '123', notes: '', followUp: '2000-01-01'
    };
    let admin: jasmine.SpyObj<AdminService>;

    beforeEach(async () => {
      admin = jasmine.createSpyObj<AdminService>('AdminService', [
        'initialize', 'login', 'clients', 'saveClient', 'activities', 'addActivity'
      ]);
      admin.initialize.and.callFake(callback => {
        callback({ uid: 'admin' } as User);
        return () => {};
      });
      admin.clients.and.resolveTo([client]);
      admin.saveClient.and.resolveTo();
      admin.activities.and.resolveTo([]);
      admin.addActivity.and.resolveTo();
      await TestBed.configureTestingModule({
        imports: [AdminPageComponent],
        providers: [{ provide: AdminService, useValue: admin }]
      }).compileComponents();
    });

    it('starts Google sign-in from the login button', async () => {
      admin.initialize.and.callFake(callback => {
        callback(null);
        return () => {};
      });
      admin.login.and.resolveTo();
      const fixture = TestBed.createComponent(AdminPageComponent);
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      expect(button.textContent).toContain('Zaloguj przez Google');
      button.click();
      await fixture.whenStable();
      expect(admin.login).toHaveBeenCalledOnceWith();
    });

    it('does not show client forms when Firestore denies access', async () => {
      admin.clients.and.rejectWith(new Error('permission-denied'));
      spyOn(console, 'error');
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent)
        .toContain('Sprawdź reguły Firestore i konto administratora');
      expect(fixture.nativeElement.querySelector('table')).toBeNull();
      expect(fixture.nativeElement.querySelector('form')).toBeNull();
    });

    it('displays a due reminder and saves edited client details', async () => {
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('tr.due')?.textContent).toContain('do kontaktu');

      fixture.componentInstance.editClient(client);
      expect(fixture.componentInstance.client.nip).toBe('');
      fixture.componentInstance.client.nip = ' 1234567890 ';
      fixture.componentInstance.client.followUp = '2030-01-01';
      await fixture.componentInstance.saveClient();
      expect(admin.saveClient).toHaveBeenCalledWith(
        jasmine.objectContaining({ name: 'Klient', nip: '1234567890', followUp: '2030-01-01' }), client.id
      );
      expect(admin.clients).toHaveBeenCalledTimes(2);
    });

    it('allows saving a client with every field empty', async () => {
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      fixture.detectChanges();
      const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
      expect(form.querySelector('[name="nip"]')).toBeTruthy();
      expect(form.querySelector('[required]')).toBeNull();
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      await fixture.whenStable();
      expect(admin.saveClient).toHaveBeenCalledWith({
        name: '', company: '', nip: '', email: '', phone: '', notes: '', followUp: ''
      }, undefined);
    });

    it('records an activity for the selected client and refreshes its history', async () => {
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      const component = fixture.componentInstance;
      await component.selectClient(client);
      component.activityType = 'E-mail';
      component.activityDate = '2026-11-24T10:30';
      component.activityNotes = '  Oferta  ';
      await component.addActivity();
      expect(admin.addActivity).toHaveBeenCalledWith(client.id, {
        type: 'E-mail', date: new Date('2026-11-24T10:30').toISOString(), notes: 'Oferta'
      });
      expect(admin.activities).toHaveBeenCalledTimes(2);
    });

    it('allows an activity with no date, type or notes', async () => {
      const fixture = TestBed.createComponent(AdminPageComponent);
      await fixture.whenStable();
      const component = fixture.componentInstance;
      await component.selectClient(client);
      await component.addActivity();
      expect(admin.addActivity).toHaveBeenCalledWith(client.id, {
        type: '', date: '', notes: ''
      });
    });
  });
});
