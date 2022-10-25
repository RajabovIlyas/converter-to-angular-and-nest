import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ConverterModule} from "./converter/converter.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ConverterModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
