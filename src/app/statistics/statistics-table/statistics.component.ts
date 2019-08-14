import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {UserProfileModel} from '../../user-profile/user.profile.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {StatisticsService} from '../statistics.service';


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


  constructor(private authService: AuthService, private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.statisticsService.getAllUsers();
    this.userSub = this.statisticsService.staticsticGet().subscribe(
      userData => {
        this.dataSource = userData.userProfile;
      });


  }

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }




  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


}
