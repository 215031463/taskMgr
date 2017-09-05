import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdListModule,
  MdGridListModule,
  MdSlideToggleModule,
  MdDialogModule,
} from '@angular/material';

@NgModule({
  imports: [
    // CommonModule,
    // MdToolbarModule,
    // MdIconModule,
    // MdButtonModule,
    // MdCardModule,
    // MdInputModule,
    // MdSlideToggleModule
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
    MdGridListModule,
    MdSlideToggleModule,
    MdDialogModule
  ]
})
export class SharedModule {

}
