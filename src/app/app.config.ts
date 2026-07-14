import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { withInterceptors } from '@angular/common/http';


import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { tenantInterceptor } from '../Interceptors/Tenant.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([tenantInterceptor]),withFetch())
  ]
};
