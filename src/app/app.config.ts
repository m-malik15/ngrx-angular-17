import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './reducers';
import { provideEffects } from '@ngrx/effects';
import { PostEffects } from './post.effects';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MsalInterceptor, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalGuard, MsalBroadcastService, MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { LogLevel, IPublicClientApplication, PublicClientApplication, BrowserCacheLocation, InteractionType } from '@azure/msal-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.azureB2C.clientId,
      authority: environment.azureB2C.authority,
      knownAuthorities: environment.azureB2C.knownAuthorities,
      redirectUri: 'http://localhost:4200',
      postLogoutRedirectUri: 'https://www.******.co.uk',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {

  const protectedResources = (environment.protectedResources);
  const protectedResourceMap = new Map<string, Array<string> | null>();

  protectedResources.map(protectedResource => protectedResourceMap.set(protectedResource.endpoint, protectedResource.scopes));

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
    authRequest: {
      forceRefresh: false
    }
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['openid']
    },
    loginFailedRoute: 'https://www.bbc.co.uk'
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    //importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(ProductDatabaseService)),
    provideStore(reducers, { metaReducers }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([PostEffects]),
    importProvidersFrom(
      BrowserModule,
      MatButtonModule,
      MatToolbarModule,
      MatListModule,
      MatMenuModule
    ),
    provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
};


export const environment = {
  azureB2C: {
    clientId: '1e6326e2-****-****-****-********',
    authority: 'https://login.****.co.uk/************************/B2C_1_SIGNIN',
    knownAuthorities: ['login.****.co.uk'],
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'https://www.******.co.uk'
  },
  protectedResources: [
    //.....
    {
      endpoint: 'https://jsonplaceholder.typicode.com/posts',
      scopes: [ 'openid']
    },

    //...
  ],
  refreshScopes: ['https://login.******', 'openid']
};
