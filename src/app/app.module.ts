import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptor} from './auth/auth-interceptor';
import {ErrorInterceptor} from './error-interceptor';
import {ErrorComponent} from './error/error.component';
import {AngularMaterialModule} from './angular-material.module';
import {PostsModule} from './posts/posts.module';
import {UserProfileModule} from './user-profile/user.profile.module';
import {MapMdoule} from './map/map.mdoule';
import {StatisticsModule} from './statistics/statistics.module';
import {WebSocketModule} from './web-socket/web.socket.module';
import {CanvasComponent} from './canvas/canvas-data/canvas.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import {BottomComponent} from './bottom/bottom.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ApixuService} from './apixu.service';
import {Ng2CarouselamosModule} from 'ng2-carouselamos';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    CanvasComponent,
    BottomComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    PostsModule,
    UserProfileModule,
    MapMdoule,
    StatisticsModule,
    WebSocketModule,
    Ng2CarouselamosModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAXZyutzornngMjFPiS7c8F5J0W8hxjX4',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    ReactiveFormsModule,

  ],
  providers: [[ApixuService], {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  exports: [

  ],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
