import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import {google} from '@agm/core/services/google-maps-types';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';
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
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;


  constructor(private titleService: Title, private userCountry: AuthService,private router:Router) {
  }


  ngOnInit() {
    this.userCountry.test();
    console.log(this.userCountry.getUserNameFromLogin()[4]);
    if(this.userCountry.getUserNameFromLogin()[4]=== undefined)
    {
      this.router.navigate(["/"]);
    }
    if(this.userCountry.getUserNameFromLogin()[4]!= undefined) {
      this.country = this.userCountry.getUserNameFromLogin()[4].split('=');

      this.zoom = 10;
      this.latitude = +(this.country[0]);
      // @ts-ignore
      this.longitude = +(this.country[1]);
    } else {
      this.latitude = 31.971233;
      this.longitude = 34.77157;
    }

    this.userIsAuthenticated = this.userCountry.getIsAuth();
    this.authListenerSubs = this.userCountry
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });



    if(this.userIsAuthenticated){
      this.userCountry.test();
    }
  }


}
