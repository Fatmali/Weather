import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; 
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchCityComponent } from './search-city.component';
import {WeatherService} from './weather.service';
import { CurrentWeatherComponent } from './current-weather.component';
import { ForecastComponent } from './forecast.component';
import { AppRoutingModule } from './app-routing.module';
import { CitiesService } from './cities.service';
import { SearchFormComponent } from './search-form.component';
import { FacebookModule } from 'ngx-facebook';
import { Component404 } from './component404/component404.component';




@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    SearchFormComponent,
    Component404

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FacebookModule.forRoot()

  ],
  providers: [WeatherService, CitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
