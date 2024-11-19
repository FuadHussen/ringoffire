import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const firebaseConfig = {
  "projectId": "ring-of-fire-9f97d",
  "appId": "1:775353891319:web:997e3bb5663fec102f56f2",
  "storageBucket": "ring-of-fire-9f97d.firebasestorage.app",
  "apiKey": "AIzaSyB5j9LuLX1_rGuGdhPFbGDos_a4bDIM9q0",
  "authDomain": "ring-of-fire-9f97d.firebaseapp.com",
  "messagingSenderId": "775353891319"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    importProvidersFrom(
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule
    )
  ],
};
