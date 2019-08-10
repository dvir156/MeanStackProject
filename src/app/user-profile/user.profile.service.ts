import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserProfileModel} from './user.profile.model';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';


const BACKEND_URL = environment.apiUrl + "/userprofile/";

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private userProfile: UserProfileModel;
  private userUpdate = new Subject<UserProfileModel>();


  constructor(private http: HttpClient, private router: Router) {
  }

  createProfileData(firstName: string, lastName: string, age: number, country: string) {
    const userData: UserProfileModel = {
      firstName,
      lastName,
      age,
      country
    };
    this.http.post(BACKEND_URL + "createdata", userData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }


//   getInfo(userId: string) {
//      this.http.get(BACKEND_URL + "userinfo/:id" + userId).subscribe(res => {
//        console.log(res);
//      });
//
// }


getInfo(userId: string) {
  this.http.get<{message: string,userFromServer: any}>(BACKEND_URL + "userinfo/:id" + userId).pipe(map(user => {
    return { userInfo: user.userFromServer.map(e => {

      })



    }

  })).subscribe(moveData =>{
  })
    ;
  }

  getUserUpdate(){
    return this.userUpdate.asObservable();
  }
}
