import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import '@angular/common/locales/global/fr';
//import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(
      {
        resourceServer: {
          sendAccessToken: true,
          allowedUrls: ['https://localhost:7207/api', 'https://localhost:7289/api','https://localhost:7282/api','https://localhost:7105/api']
        }
      }
    )
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'fr' }],
  

  bootstrap: [AppComponent],
})
export class AppModule { }
