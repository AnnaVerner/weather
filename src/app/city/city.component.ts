import {Component, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})

export class CityComponent implements OnInit {
  city = '';
  apiKey = '&APPID=30207107bc535d632efa95d4d3323fc1';
  requestURL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  weather: any;
  loaded = false;
  error = false;
  errorCode: any;
  mobile = false;
  @Output() dataWeather;
  @Output() mobileFlag;
  ngOnInit() {
    this.mobile = window.innerWidth < 600;
  }
  onResize(event) {
    this.mobile = event.target.innerWidth < 600;
  }
  constructor(private httpClient: HttpClient) {}
  getData() {
    console.log(this.requestURL + this.city + this.apiKey);
    this.httpClient.get(this.requestURL + this.city + this.apiKey).subscribe((data: any) => {

      if (data.cod === '200') {
          this.weather = data;
          this.error = false;
          this.loaded = true;
          console.log(this.weather);
      }
      }, error => {
      if (error.status !== 200) {
        this.error = true;
        this.loaded = false;
        this.errorCode = error.status;
      } else {
        this.error = false;
      }
    });
  }
  tr
  formatDate(date) {
    let dateArray = (new Date(date.split(' ')[0])).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).split(',');
    dateArray.push((((date.split(' ')[1]).split(':')).splice(0, 2)).join(':'));
    return dateArray;
  }
  getTempInCelsium(data) {
    return (parseFloat(data) - 273.15).toFixed(1);
  }
  onKeyDown(event: any) {
      if (event.key === 'Enter') {
        this.city = event.target.value ;
        this.getData();
      }
  }

}
