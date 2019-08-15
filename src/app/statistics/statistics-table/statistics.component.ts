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

  public barChartLabels:String[];

  userMap: Map<string , number>;
  ageMap: Map<string , number>;
  countryLableArr = new Array<string>();
  countryCountArr = new Array<number>();
  tempCount: number;


  constructor(private authService: AuthService, private statisticsService: StatisticsService) {
    this.userMap=new Map<string, number>();
    this.ageMap=new Map<string, number>();
  }

  ngOnInit() {
    this.statisticsService.getAllUsers();
    this.userSub = this.statisticsService.staticsticGet().subscribe(
      userData => {
        this.dataSource = userData.userProfile;
        console.log(this.dataSource);
        this.dataSource.forEach(u=>{
          if(this.userMap.has(u.countryName)){
            this.tempCount = this.userMap.get(u.countryName);
            this.userMap.set(u.countryName,1+this.tempCount);
          }else{
            this.userMap.set(u.countryName,1);
          }

          if(this.ageMap.has(u.age.toString())){
            this.tempCount = this.ageMap.get(u.age.toString());
            this.ageMap.set(u.age.toString(),1+this.tempCount);
          }else{
            this.ageMap.set(u.age.toString(),1);
          }
        });
        console.log("map");
        console.log(this.userMap);
        this.barChartLabels = Array.from(this.userMap.keys());
        this.barChartData =  [{data: Array.from(this.userMap.values())}];
        console.log(this.barChartLabels);
        console.log(this.barChartData);

        this.doughnutChartLabels = Array.from(this.ageMap.keys());
        this.doughnutChartData = Array.from(this.ageMap.values())


      });

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
 // public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40]}
  ];



  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

}
