import { NgModule, SkipSelf, Optional } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from '../service/service.module';

import { MdSidenavModule } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { svgResourceLoad } from '../utils/svg-icon.utils';
import 'hammerjs';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MdSidenavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    ServiceModule
  ],
  providers: [
    {
      provide: 'APP_CONFIG',
      useValue: {
        url: 'http://localhost:3000'
      }
     }
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
