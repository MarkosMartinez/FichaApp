import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app/app.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './component/login/login.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { MainComponent } from './component/main/main.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UsersComponent } from './component/users/users.component';
import { AdduserComponent } from './component/adduser/adduser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './component/alert/alert.component';
import { ConfigComponent } from './component/config/config.component';
import { ProfileComponent } from './component/profile/profile.component';




export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}