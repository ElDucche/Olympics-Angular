import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailComponent } from './pages/detail/detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, HomeComponent],
  imports: [BrowserModule, NgxChartsModule, AppRoutingModule, HttpClientModule, DetailComponent, BrowserAnimationsModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

}
