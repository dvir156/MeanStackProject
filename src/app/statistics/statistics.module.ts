import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {RouterModule} from '@angular/router';
import {StatisticsComponent} from './statistics-table/statistics.component';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})


export class StatisticsModule {

}
