import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from './weather.service';

@Component({
  selector: 'search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
  
})
export class SearchCityComponent implements OnInit {

  private sub: any;
  cityName : string;
  dataReady : boolean = false;
  data: any;
  imageLink: string;
  currentWeather: Object;
  currentWeatherDescription: string;
  country: string;
  temp: number;
  humidity: string;
  wind:string;
  date: Date = new Date();
  forecastData : any;
  isForecastReady: boolean = false;
  forecast : Array<Object>=[];


  setUpWeatherDetails(){
    this.imageLink = `http://openweathermap.org/img/w/${this.data.weather[0].icon}.png`;
    this.currentWeather = this.data.weather[0].main;
    this.currentWeatherDescription = this.data.weather[0].description;
    this.country = this.data.sys.country;
    this.temp = this.data.main.temp-273.15;
    this.humidity = this.data.main.humidity;
    this.wind = this.data.wind.speed;
    
  }

  constructor(private route: ActivatedRoute, private weatherService : WeatherService){}

  ngOnInit(){


    this.sub = this.route.params.subscribe( params =>
      {
        this.cityName = params['name'];
        this.weatherService.getWeatherByCityName(this.cityName)
        .then(result => {
          this.data = result;
          this.dataReady = true;
          this.setUpWeatherDetails();
          console.log(this.cityName.toUpperCase +" Weather: ");
          console.log(this.data);

        })
        .catch(error => console.log(error))


      }
    )

     this.weatherService.getOtherCityWeatherForecast("Honolulu")
    .then(response => {

      this.forecastData = response;
      console.log(this.forecastData);
      this.isForecastReady = true;
      this.forecast.push(this.forecastData.list[8]);
      this.forecast.push(this.forecastData.list[16]);
      this.forecast.push(this.forecastData.list[24]);
      console.log(this.forecast);
  })

    



  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
  

