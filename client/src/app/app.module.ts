import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { SnowpathModule } from './snowpath/snowpath.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './config/auth-guard';
import { httpInterceptorProviders } from './config/index';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { AccountService } from './service/account.service';
import { ContactService } from './service/contact.service';
import { DeveloperService } from './service/developer.service';
import { DirtyService } from './service/dirty.service';
import { AlertService } from './service/alert.service';
import { MessageService } from './service/message.service';
import {
  AccountResolver,
  ContactsResolver,
  DirectsResolver,
  MessageResolver,
} from './util/data-resolver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    SnowpathModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    httpInterceptorProviders,
    AuthService,
    AccountService,
    AccountResolver,
    ContactsResolver,
    ContactService,
    DeveloperService,
    DirtyService,
    AlertService,
    MessageResolver,
    MessageService,
    DirectsResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
