import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormsModule),
  ],
}).catch((err) => console.error(err));
