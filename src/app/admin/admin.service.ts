import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  Firestore, addDoc, collection, doc, getDocs, getFirestore, updateDoc
} from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';

export interface ClientData {
  name: string;
  company: string;
  nip: string;
  email: string;
  phone: string;
  notes: string;
  followUp: string;
}

export interface Client extends Omit<ClientData, 'nip'> {
  id: string;
  nip?: string;
}

export interface Activity {
  id: string;
  type: 'Telefon' | 'E-mail' | '';
  date: string;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private app?: FirebaseApp;
  private auth?: Auth;
  private db?: Firestore;

  initialize(callback: (user: User | null) => void, onError: (error: Error) => void): () => void {
    if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
      throw new Error('Brak konfiguracji Firebase. Uzupełnij dane aplikacji zgodnie z instrukcją w README.');
    }
    this.app ??= initializeApp(firebaseConfig, 'admin');
    this.auth ??= getAuth(this.app);
    this.db ??= getFirestore(this.app);
    return onAuthStateChanged(this.auth, callback, onError);
  }

  async login(): Promise<void> {
    await signInWithPopup(this.requireAuth(), new GoogleAuthProvider());
  }

  async logout(): Promise<void> {
    await signOut(this.requireAuth());
  }

  async clients(): Promise<Client[]> {
    const snapshot = await getDocs(collection(this.requireDb(), 'clients'));
    return snapshot.docs.map(item => ({ ...item.data() as ClientData, id: item.id }))
      .sort((a, b) => a.name.localeCompare(b.name, 'pl'));
  }

  async saveClient(client: ClientData, id?: string): Promise<void> {
    const db = this.requireDb();
    if (id) {
      await updateDoc(doc(db, 'clients', id), { ...client });
    } else {
      await addDoc(collection(db, 'clients'), client);
    }
  }

  async activities(clientId: string): Promise<Activity[]> {
    const snapshot = await getDocs(collection(this.requireDb(), 'clients', clientId, 'activities'));
    return snapshot.docs.map(item => ({ ...item.data() as Omit<Activity, 'id'>, id: item.id }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  async addActivity(clientId: string, activity: Omit<Activity, 'id'>): Promise<void> {
    await addDoc(collection(this.requireDb(), 'clients', clientId, 'activities'), activity);
  }

  private requireAuth(): Auth {
    if (!this.auth) throw new Error('Firebase Authentication nie jest skonfigurowane.');
    return this.auth;
  }

  private requireDb(): Firestore {
    if (!this.db) throw new Error('Firestore nie jest skonfigurowany.');
    return this.db;
  }
}
