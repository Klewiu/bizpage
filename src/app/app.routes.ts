import { Routes } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page.component';
import { PrivacyPageComponent } from './pages/privacy-page.component';
import { XoailaPageComponent } from './pages/xoaila-page.component';

export const routes: Routes = [
	{ path: '', component: HomePageComponent },
	{ path: 'aktywne-saas', component: XoailaPageComponent },
	{ path: 'contact', component: ContactPageComponent },
	{ path: 'privacy-policy', component: PrivacyPageComponent },
	{ path: '**', component: NotFoundPageComponent }
];
