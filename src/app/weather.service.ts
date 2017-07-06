import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';




@Injectable()
export class WeatherService{
    api_key : string = `0183250f36abb9c091f4c97072d8d15b`;
    lat : string = `lat=0.51629`;
    long : string = `lon=35.257536`;
  

    private headers =new Headers({'Content-Type':'application/json'});
    
    constructor(private http: Http){}

    getWeatherByCityName(cityName: string): Promise<Object>{
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this.api_key}`;
        return this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError)
    };




    getWeatherByLocation(): Promise<Object>{
       const url = `http://api.openweathermap.org/data/2.5/weather?${this.lat}&${this.long}&APPID=${this.api_key}`;
       return this.http.get(url) //returns an observable
       .toPromise()
       .then(response => response.json())
       .catch(this.handleError);


    }

    handleError(){
        console.error("An HTTP error occured");
    }

    getWeatherForecast() : Promise<Object> {
         const url = `http://api.openweathermap.org/data/2.5/forecast?${this.lat}&${this.long}&APPID=${this.api_key}`;
         return this.http.get(url)
         .toPromise()
         .then(response => response.json())
         .catch(this.handleError)  
    }

    getOtherCityWeatherForecast(cityName : string): Promise<Object>{
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${this.api_key}`;
         return this.http.get(url)
         .toPromise()
         .then(response => response.json())
         .catch(this.handleError)  
    }
}



