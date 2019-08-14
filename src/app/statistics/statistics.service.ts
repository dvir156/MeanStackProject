import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {UserProfileModel} from '../user-profile/user.profile.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';


const BACKEND_URL = environment.apiUrl + '/userprofile/';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private userProfile: UserProfileModel[] = [];
  private userSatisiticsUpdate = new Subject<{userProfile: UserProfileModel[]}>();

  constructor(private http: HttpClient, private router: Router) {}


  getAllUsers() {
    this.http.get<{userProfile: any}>(BACKEND_URL + 'alldata')
      .pipe(
        map(userData => {
        return { userProfile: userData.userProfile.map(moreData => {
            return {
              firstName: moreData.firstName,
              lastName: moreData.lastName,
              age: moreData.age,
              countryName: moreData.countryName
            };
          })
        };
      })
      ).subscribe(transformedUserData => {
       this.userProfile = transformedUserData.userProfile;
       this.userSatisiticsUpdate.next({userProfile: [...this.userProfile]});
    });
  }

  staticsticGet() {
    return this.userSatisiticsUpdate.asObservable();
  }

}
