import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfileService} from '../user.profile.service';
import {FormGroup, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserProfileModel} from '../user.profile.model';
import {AuthService} from '../../auth/auth.service';
import PlaceResult = google.maps.places.PlaceResult;
import {Appearance, Location} from '@angular-material-extensions/google-maps-autocomplete';


@Component({
  selector: 'app-profile',
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.css'],
})


export class UserProfileComponent implements OnInit, OnDestroy {
  country: string;
  isLoading = false;
  private userSub: Subscription;
  form: FormGroup;
  user: UserProfileModel;
  profile = false;
  public appearance = Appearance;
  public latitude: number;
  public longitude: number;

  constructor(public userProfileService: UserProfileService, private authService: AuthService) {
    this.country = '';
  }

  createData(data: NgForm) {
    if (data.invalid) {
      return;
    }
    this.userProfileService.createProfileData(
      data.value.FirstName,
      data.value.LastName,
      data.value.Age,
      //  data.value.Country
      this.country
    );
    // window.location.reload();
  }

  ngOnInit() {
    this.userProfileService.getInfo(this.authService.getUserId());
    this.userSub = this.userProfileService.getUserUpdate()
      .subscribe((fromServer: any) => {
        this.user = fromServer;
      });
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  // onAutocompleteSelected(result: PlaceResult) {
  //   // this.country = result.address_components;
  //   console.log(this.country = result.address_components[3].long_name);
  // }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.country += location.latitude.toString();
    this.country +='='
    this.country += location.longitude.toString();
    console.log('country ', this.country);
  }
}
