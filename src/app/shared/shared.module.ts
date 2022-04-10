import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

const materialModules = [
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatSidenavModule,
  MatPaginatorModule,
  MatTableModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatCardModule,
  DragDropModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ...materialModules,
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ...materialModules,
  ],
})
export class SharedModule {}
