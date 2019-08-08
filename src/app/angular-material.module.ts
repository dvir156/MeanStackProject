import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatInputModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatBadgeModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  exports: [
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule
  ]
})

export class AngularMaterialModule {}
