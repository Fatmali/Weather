import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CitiesService{

    constructor(private http: Http){}

    searchCity(term: string): Observable<any>{
         let headers =  new Headers();
         headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        return this.http.get("http://api.geonames.org/searchJSON?q="+term+"&username=fatmali")
        .map(response => response.json())
        
    }
}