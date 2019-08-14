import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.css'],
})

export class BottomComponent implements OnInit , OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });



    if(this.userIsAuthenticated){
      this.authService.test();
    }

  }

  onLogout() {
    this.authService.logout();
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

}
