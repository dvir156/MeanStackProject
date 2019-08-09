import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import {PostListComponent} from './posts/post-list/Post-list.component';
import {AuthGuard} from './auth/auth.guard';
import {MapComponent} from './map/map.component';
import {UserProfileComponent} from './user-profile/profile-info/user.profile.component';
import {MapComponent} from './map/map-google/map.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent , canActivate: [AuthGuard]},
  { path: 'edit/:postId', component: PostCreateComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  {path: 'map' , component: MapComponent}
  { path: 'userprofile', component: UserProfileComponent , canActivate: [AuthGuard]},
  { path: 'map', component: MapComponent , canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}

