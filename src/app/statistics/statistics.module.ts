import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {RouterModule} from '@angular/router';
import {StatisticsComponent} from './statistics-table/statistics.component';
import {MatPaginatorModule, MatSidenavModule, MatSortModule, MatTableModule} from '@angular/material';
import {NameFilterPipe} from './name-filter';
import {GroupByPipe} from './groupBy';
import {LastnameFilter} from './lastname-filter';
import {CountryFilter} from './country-filter';

@NgModule({
  declarations: [
    StatisticsComponent,
    NameFilterPipe,
    GroupByPipe,
    LastnameFilter,
    CountryFilter
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,

  ]
})


export class StatisticsModule {

}
