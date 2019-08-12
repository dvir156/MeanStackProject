import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfileService} from '../user.profile.service';
import {FormGroup, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserProfileModel} from '../user.profile.model';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.css']
})


export class UserProfileComponent implements OnInit, OnDestroy {
  isLoading = false;
  private userSub: Subscription;
  form: FormGroup;
  user: UserProfileModel;
  profile = false;

  constructor(public userProfileService: UserProfileService, private authService: AuthService) {
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


  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
