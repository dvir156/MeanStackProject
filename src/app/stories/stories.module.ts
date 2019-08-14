import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {RouterModule} from '@angular/router';
import {StoriesCreateComponent} from './stories-create/Stories-Create.component';
import {StoriesListComponent} from './stories-list/Stories-list.component';

@NgModule({
  declarations: [
    StoriesCreateComponent,
    StoriesListComponent
  ],
  exports: [
    StoriesCreateComponent,
    StoriesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,

  ]
})

export class StoriesModule {

}
