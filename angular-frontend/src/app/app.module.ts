import {
  MatButtonModule, MatSliderModule, MatToolbarModule,
  MatCardModule, MatTableModule, MatDialogModule, MatCheckboxModule,
  MatIconModule, MatSelectModule, MatMenuModule, MatSnackBarModule
} from '@angular/material'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';

import { NouisliderModule } from 'ng2-nouislider/src/nouislider';


@NgModule({
  declarations: [
    FilterComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,


    HttpModule,
    FormsModule,

    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTableModule,
    MatSliderModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,

    MatSnackBarModule,

    NouisliderModule,
  ],
  entryComponents: [FilterComponent],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
