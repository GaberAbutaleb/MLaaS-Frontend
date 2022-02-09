import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import {NgBusyModule} from 'ng-busy';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { SideNavComponent } from './SideNav/side-nav/side-nav.component';
import { SideNavContentComponent } from './SideNav/side-nav-content/side-nav-content.component';
import { HttpClientModule } from '@angular/common/http';
import { ScikitLearnModule } from './clustering/scikit-learn/scikit-learn.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { NgForm } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import {MatExpansionModule} from '@angular/material/expansion';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    SideNavContentComponent,
    NoAccessComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ScikitLearnModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    // NgForm,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }), // ToastrModule added
    NgBusyModule
  ],
  providers: [AuthGuardService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
