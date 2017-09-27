import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  MdAutocompleteModule,
  MdMenuModule,
  MdCheckboxModule,
  MdTooltipModule,
  MdRadioModule,
  MdDatepickerModule,
  // MdNativeDateModule,
  DateAdapter,
  MD_DATE_FORMATS,
  MdSelectModule,
  MdButtonToggleModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';

import { MY_DATE_FORMATS, MyDateAdapter } from './md-date';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    ReactiveFormsModule,
    MdButtonToggleModule,
    MdDatepickerModule,
    // MdNativeDateModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    AgeInputComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdGridListModule,
    MdSlideToggleModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    // MdNativeDateModule,
    MdSelectModule,
    DirectiveModule,
    ConfirmDialogComponent,
    ImageListSelectComponent,
    AgeInputComponent,
  ],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MD_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class SharedModule {

}
