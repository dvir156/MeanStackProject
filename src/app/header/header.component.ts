import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {UserProfileModel} from '../user-profile/user.profile.model';
import {UserProfileService} from '../user-profile/user.profile.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit , OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private user: UserProfileModel;
  private userSub: Subscription;

  constructor(private authService: AuthService,public userProfileService: UserProfileService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.userProfileService.getInfo(this.authService.getUserId());
    this.userSub = this.userProfileService.getUserUpdate()
      .subscribe((fromServer: any) => {
        this.user = fromServer;
      });

  }

  onLogout() {
    this.user = null;
    this.authService.logout();
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

}

