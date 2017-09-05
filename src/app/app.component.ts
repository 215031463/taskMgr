import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public dark = false;
  public toggleTheme(event: boolean): void
  {
    this.dark = event;
  }
}
