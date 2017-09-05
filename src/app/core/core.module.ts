import { NgModule, SkipSelf, Optional } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { svgResourceLoad } from '../utils/svg-icon.utils';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class CoreModule {
  constructor(
    ir: MdIconRegistry,
    ds: DomSanitizer,
    @Optional() @SkipSelf() parent: CoreModule
  ) {
    if (parent) {
      throw new Error('core module should been loaded only onece');
    }
    svgResourceLoad(ir, ds);
  }
}
