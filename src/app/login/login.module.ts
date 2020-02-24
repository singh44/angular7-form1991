import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from '../_helpers';
import { LoginRoutingModule } from './login-routing.module';
import { JwtInterceptor, ErrorInterceptor } from '../_helpers';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginRoutingModule
  ],
})
/*
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    bootstrap: [LoginComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ]
})
*/
export class LoginFormModule { }