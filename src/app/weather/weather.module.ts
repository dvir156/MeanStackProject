import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {RouterModule} from '@angular/router';
import {WeatherComponent} from './weather-data/weather.component';


@NgModule({
  declarations: [
    WeatherComponent
  ],
  exports: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
  ]
})



export class WeatherModule {

}
