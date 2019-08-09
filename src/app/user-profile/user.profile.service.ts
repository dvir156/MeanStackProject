import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserProfileModel} from './user.profile.model';
import {Router} from '@angular/router';

const BACKEND_URL = environment.apiUrl + "/userprofile/";

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private userProfile: UserProfileModel;


  constructor(private http: HttpClient,private router: Router) {}

  createProfileData(firstName: string, lastName: string, age: number, country: string){
    const userData: UserProfileModel = {
      firstName,
      lastName,
      age,
      country
    };
    this.http.post(BACKEND_URL + "createdata",userData).subscribe( () =>{
      this.router.navigate(['/']);
      });
  }


  // getInfo(userId: string) {
  //   this.http.get(BACKEND_URL +"userinfo/").subscribe((response) => {
  //     console.log(response)
  //   });
  // }

}
