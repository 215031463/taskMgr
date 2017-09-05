import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
} from '@angular/material';

@NgModule({
  imports: [
    // CommonModule,
    // MdToolbarModule,
    // MdIconModule,
    // MdButtonModule,
    // MdCardModule,
    // MdInputModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
  ]
})
export class SharedModule {

}
