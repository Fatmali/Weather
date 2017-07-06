import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ForecastComponent} from './forecast.component';
import {CurrentWeatherComponent} from './current-weather.component';
import {SearchCityComponent} from './search-city.component'
import {Component404} from './component404/component404.component'

const routes : Routes =[
  {path:'', redirectTo:'current', pathMatch:'full'},
  {path : 'forecast', component: ForecastComponent },
  {path : 'current', component: CurrentWeatherComponent},
  {path:'places/:name', component: SearchCityComponent},
  {path:'**', redirectTo:'404', pathMatch:'prefix'},
  {path:'404', component: Component404}
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports:[RouterModule]
})





export class AppRoutingModule { }
