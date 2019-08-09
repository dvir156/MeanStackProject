import {NgModule} from '@angular/core';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostListComponent} from './post-list/Post-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {CommonModule} from '@angular/common';
import { RouterModule } from "@angular/router";
import {PostNameFilterPipe} from './posts-filter.pipe';
import {PostContentFilterPipe} from './Post-Content-Filter-Pipe';


@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PostNameFilterPipe,
    PostContentFilterPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})

export class PostsModule {

}
