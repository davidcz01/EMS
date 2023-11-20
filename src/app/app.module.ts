import { HttpClientModule } from '@angular/common/http'; // importing the http module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  declarations: [AppComponent, EmployeeListComponent, LoginPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-vmeqxdqfzl5wnxhx.uk.auth0.com',
      clientId: 'hD53SpWxiMJdXkFhV6n8b359GxlBauCl',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/employeeList',
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
