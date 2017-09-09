import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public dark = false;

  constructor(private oc: OverlayContainer) { }

  public toggleTheme(event: boolean): void
  {
    this.dark = event;
    this.oc.themeClass = this.dark ? 'my-dark-theme' : null;
  }

}
