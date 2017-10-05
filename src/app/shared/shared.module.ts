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
  MdChipsModule,
  MdButtonToggleModule,
  MdTabsModule,
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';

import { MY_DATE_FORMATS, MyDateAdapter } from './md-date';
import { IdentityInputComponent } from './identity-input/identity-input.component';
import { AreaListComponent } from './area-list/area-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    ReactiveFormsModule,
    MdButtonToggleModule,
    MdDatepickerModule,
    MdSelectModule,
    MdChipsModule,
    MdAutocompleteModule
    // MdNativeDateModule
  ],
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent,
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
    MdChipsModule,
    MdTabsModule,
    DirectiveModule,
    ConfirmDialogComponent,
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent,
  ],
  providers: [
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MD_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class SharedModule {

}
