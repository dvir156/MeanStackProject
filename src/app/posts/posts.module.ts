import {NgModule} from '@angular/core';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostListComponent} from './post-list/Post-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {PostNameFilterPipe} from './posts-filter.pipe';
import {PostContentFilterPipe} from './Post-Content-Filter-Pipe';
import {PostImageFilter} from './post-image-filter';
import {StoryCreateComponent} from '../stories/story-create/story-create.component';
import {StoryListComponent} from '../stories/story-list/story-list.component';
import {SliderModule} from 'angular-image-slider';
import {Ng2CarouselamosModule} from 'ng2-carouselamos';


@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PostNameFilterPipe,
    PostContentFilterPipe,
    PostImageFilter,
    StoryCreateComponent,
    StoryListComponent
  ],
  exports: [
    StoryListComponent,
    StoryCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    SliderModule,
    Ng2CarouselamosModule,
  ]
})

export class PostsModule {

}
