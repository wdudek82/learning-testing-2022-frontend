import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
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
  DragDropModule,
]

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    ...materialModules,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MainLayoutComponent,
    ...materialModules,
  ],
})
export class CoreModule {}
