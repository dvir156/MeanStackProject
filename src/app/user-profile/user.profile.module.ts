import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {RouterModule} from '@angular/router';
import {UserProfileComponent} from './profile-info/user.profile.component';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    MatGoogleMapsAutocompleteModule,
  ]
})



export class UserProfileModule {

}
