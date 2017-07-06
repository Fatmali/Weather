import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';

@Component({
  selector: 'current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],

})
export class CurrentWeatherComponent implements OnInit {

  data : any ;
  dataReady: boolean = false;
  imageLink: string;
  currentWeather: string;
  currentWeatherDescription : string;
  date:Date= new Date();
  town: string;
  country: string;
  temp: number;
  humidity: string
  wind: string;
  ip : any;
  ipAddressReady: boolean = false;
  quote: string;

  

  constructor(private weatherService: WeatherService, private fb: FacebookService){

    let initParams: InitParams = {
      appId: '1566009673469790',
      xfbml: true,
      version: 'v2.9'
    };

    fb.init(initParams);

  }

  setUpWeatherDetails(){
    this.imageLink = `http://openweathermap.org/img/w/${this.data.weather[0].icon}.png`;
    this.currentWeather = this.data.weather[0].main;
    this.currentWeatherDescription = this.data.weather[0].description;
    this.town = this.data.name;
    this.country = this.data.sys.country;
    this.temp = this.data.main.temp-273.15;
    this.humidity = this.data.main.humidity;
    this.wind = this.data.wind.speed;

    
  }
    

    
  ngOnInit(){

    
   
   this.weatherService.getWeatherByLocation()
   .then(response => {
     this.data = response; 
     console.log(this.data); 
     this.dataReady=true;
     this.setUpWeatherDetails();
     this.quote=this.getFbQuote(+this.data.main.temp-273.15);
   } 
     );
  }


  share(url: string) {
 
  let params: UIParams = {
      href:'https://weatherapp-41e68.firebaseapp.com/current',
      quote: this.quote,
      method: 'share'
  };
 
  this.fb.ui(params)
    .then((res: UIResponse) => console.log(res))
    .catch((e: any) => console.error(e));
 
}


getFbQuote(temp : number): string {
  if(temp<=15){return "Man its freezing out here! Cup of coffee anyone?";}
  if(temp<=27 || temp>=20){return "Great weather outside! Who wants to go for a picnic?";}
  if(temp>=30){return "Too Hot for life! In need of some serious Ice Cream!!"}

  
}

   }
   

  

