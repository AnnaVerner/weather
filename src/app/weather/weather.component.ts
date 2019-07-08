import {Component, Input} from '@angular/core';
import {CityComponent} from '../city/city.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather-component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [CityComponent]
})
export class WeatherComponent {
  @Input() dataWeather;
  @Input() mobileFlag;
  constructor(public cityComponent: CityComponent) {}
}
export class Weather {
  constructor(public city: object, public cod: string, public list: any[]) {}
}
