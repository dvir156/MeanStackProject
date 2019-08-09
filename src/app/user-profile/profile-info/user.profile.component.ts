import {Component, OnInit} from '@angular/core';
import {UserProfileService} from '../user.profile.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserProfileModel} from '../user.profile.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.css']
})


export class UserProfileComponent implements OnInit {
  isLoading = false;
  private userId: string;
  private authStatusSub: Subscription;
  form: FormGroup;
  user: UserProfileModel;

  constructor(public userProfileService: UserProfileService, public route: ActivatedRoute, private authService: AuthService) {
  }

  createData(data: NgForm) {
    if (data.invalid) {
      return;
    }
    this.userProfileService.createProfileData(
      data.value.FirstName,
      data.value.LastName,
      data.value.Age,
      data.value.Country
    )

  }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    // console.log(this.userProfileService.getInfo(this.userId));
  }
}
