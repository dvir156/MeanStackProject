import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {RouterModule} from '@angular/router';
import {MapComponent} from './map-google/map.component';
import {AgmCoreModule} from '@agm/core';


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "Google map JavaScript API key"
     })
  ]
})

export class MapMdoule {

}
