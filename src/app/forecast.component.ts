import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  
})
export class ForecastComponent implements OnInit {
  forecastData : any;
  isforecastDataReady : boolean = false;
  forecast: Object[] = [];
  constructor( private weatherService: WeatherService ) {}


  ngOnInit() {

    this.weatherService.getWeatherForecast()
    .then(response => {
      this.forecastData = response;
      console.log(this.forecastData);
      this.isforecastDataReady = true;
      this.forecast.push(this.forecastData.list[8]);
      this.forecast.push(this.forecastData.list[16]);
      this.forecast.push(this.forecastData.list[24]);
      console.log(this.forecast);
 
    })

  }



}
