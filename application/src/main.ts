import { bootstrap } from '@angular/platform-browser-dynamic';
import {enableProdMode, provide} from '@angular/core';
import { AppComponent, environment } from './app/';
import {APP_ROUTER_PROVIDER} from "./app/app.route";
import {ContentService} from "./app/content/content.service";
import {provideForms, disableDeprecatedForms} from "@angular/forms";
import {HTTP_PROVIDERS} from "@angular/http";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {AuthService} from "./app/shared/auth.service";
import {ChatService} from "./app/chat/chat.service";


if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent , [
  APP_ROUTER_PROVIDER,
  ContentService,
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,
  provide(LocationStrategy, {'useClass': HashLocationStrategy }),
  AuthService,
  ChatService
]);

