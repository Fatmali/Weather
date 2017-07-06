import { Component, OnInit, OnDestroy } from '@angular/core';
import { CitiesService } from './cities.service';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

   searchField : FormControl;
  searchForm : FormGroup;
  suggestions : Array<Object>;
  suggestionsReady : boolean = false;
  request : any;
  suggestionsEmpty: boolean = false;
  listVisible : boolean = false;
  


  constructor(private citiesService: CitiesService, private fb: FormBuilder,
   private router: Router){}

  ngOnInit(){
    this.searchField = new FormControl();
     this.searchForm = this.fb.group({searchField: this.searchField})
     this.request= this.searchField.valueChanges
          .debounceTime(400)
          .distinctUntilChanged()
          .switchMap(term => {
            this.listVisible = true;
            if(term=="") {
              this.suggestionsEmpty = true;
              return this.citiesService.searchCity("xdfhbvhdfbfvhdhvbfhdb")}
            else{
            this.suggestionsEmpty=false;
            return this.citiesService.searchCity(term);
            }   
          })
          .catch(error => {
            console.log("Error occurred in app component: "+ error);
            return Observable.of<string>('');
          })
          .subscribe(result => {
            this.suggestions= result.geonames.slice(0,10);
            this.suggestions=this.suggestions.filter(filterArr);
            this.suggestionsReady = true;
            console.log(this.suggestions);
          })
          ;
   
    
    function filterArr(city: any) {
      return (city.fcodeName != "section of populated place" || city.fcodeName != "populated place")
      && city.fclName  === "city, village,..."
       ;
}

  }


   ngOnDestroy(){
      this.request.unsubscribe();
    }

  

    stopShowingList(): void{
        this.listVisible = false;
    }

}
