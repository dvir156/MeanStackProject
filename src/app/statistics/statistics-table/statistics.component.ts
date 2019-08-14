import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfileModel} from '../../user-profile/user.profile.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {StatisticsService} from '../statistics.service';
import {Location} from '@angular-material-extensions/google-maps-autocomplete';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'country'];
  dataSource: UserProfileModel[] = [];
  private userSub: Subscription;
  searchTermByName: string;
  searchTermByLastName: string;
  searchTermByCountry: string;
  location:Location;

  constructor(private authService: AuthService, private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.statisticsService.getAllUsers();
    this.userSub = this.statisticsService.staticsticGet().subscribe(
      userData => {
        this.dataSource = userData.userProfile;
      });


  }







  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


}
