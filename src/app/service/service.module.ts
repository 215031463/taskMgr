import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quote/quote.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [QuoteService]
})
export class ServiceModule { }