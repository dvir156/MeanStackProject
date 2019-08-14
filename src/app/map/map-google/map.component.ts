import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import {google} from '@agm/core/services/google-maps-types';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  public  country: [2];

  constructor(private titleService: Title, private userCountry: AuthService, private router:Router) {
  }

  ngOnInit() {
    this.userCountry.test();
    console.log(this.userCountry.getUserNameFromLogin()[4]);
    if(this.userCountry.getUserNameFromLogin()[4]=== undefined){
      this.router.navigate(["/"]);
    }
    if(this.userCountry.getUserNameFromLogin()[4]!= undefined) {
      this.country = this.userCountry.getUserNameFromLogin()[4].split('=');
      // console.log(this.userCountry.getUserNameFromLogin()[4]);
      this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');

      this.zoom = 10;
      this.latitude = +(this.country[0]);
      // @ts-ignore
      this.longitude = +(this.country[1]);
    } else {
      this.latitude = 31.971233;
      this.longitude = 34.77157;
    }
  }

  // private setCurrentPosition() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }
  //
  // onAutocompleteSelected(result: PlaceResult) {
  //   console.log('onAutocompleteSelected: ', result);
  // }
  //
  // onLocationSelected(location: Location) {
  //   console.log('onLocationSelected: ', location);
  //   this.latitude = location.latitude;
  //   this.longitude = location.longitude;
  // }

  // constructor() { }
  // latitude = 51.678418;
  // longitude = 7.809007;
  // locationChosen = false;
  //
  // ngOnInit() {
  // }
  //
  // onChoseLocation(event) {
  //   this.latitude = event.coords.lat;
  //   this.longitude = event.coords.lng;
  //   this.locationChosen = true;
  // }
}
