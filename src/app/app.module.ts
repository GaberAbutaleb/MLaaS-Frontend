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

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    SideNavContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ScikitLearnModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }), // ToastrModule added
    NgBusyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
