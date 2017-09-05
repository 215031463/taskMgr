import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const svgResourceLoad = (ir: MdIconRegistry, ds: DomSanitizer) => {
  ir.addSvgIcon('favorite', ds.bypassSecurityTrustResourceUrl('assets/favorite.svg'));
}
