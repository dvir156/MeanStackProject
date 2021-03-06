import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import {PostListComponent} from './posts/post-list/Post-list.component';
import {AuthGuard} from './auth/auth.guard';
import {UserProfileComponent} from './user-profile/profile-info/user.profile.component';
import {MapComponent} from './map/map-google/map.component';
import {StatisticsComponent} from './statistics/statistics-table/statistics.component';
import {ChatComponent} from './web-socket/socket-io/chat.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent , canActivate: [AuthGuard]},
  { path: 'edit/:postId', component: PostCreateComponent , canActivate: [AuthGuard]},
  { path: 'userprofile', component: UserProfileComponent , canActivate: [AuthGuard]},
  { path: 'statistics', component: StatisticsComponent , canActivate: [AuthGuard]},
  { path: 'map', component: MapComponent , canActivate: [AuthGuard]},
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'about', component: AboutComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}

