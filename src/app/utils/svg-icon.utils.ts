import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const svgResourceLoad = (ir: MdIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/img';
  const sidebarDir = `${imgDir}/sidebar`;
  const daysDir = `${imgDir}/days`
  const avatarDir = `${imgDir}/avatar`;
  const iconsDir = `${imgDir}/icons`;

  ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));
  ir.addSvgIcon('unassigned', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/unassigned.svg`));
  ir.addSvgIcon('projects', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
  ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
  ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
  // ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
  ir.addSvgIcon('move', ds.bypassSecurityTrustResourceUrl(`${iconsDir}/move.svg`));
  ir.addSvgIcon('add', ds.bypassSecurityTrustResourceUrl(`${iconsDir}/add.svg`));
  ir.addSvgIcon('delete', ds.bypassSecurityTrustResourceUrl(`${iconsDir}/delete.svg`));

  for (let i = 0; i < 31; i++) {
    ir.addSvgIcon(`day${i + 1}`, ds.bypassSecurityTrustResourceUrl(`${daysDir}/day${i + 1}.svg`));
  }
}
