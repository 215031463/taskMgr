import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  toggleSidebarRequest: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  toggleThemeRequest: EventEmitter<boolean>  = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public toggleSidebar(): void
  {
    this.toggleSidebarRequest.emit();
  }

  public toggleTheme(event: boolean): void
  {
    this.toggleThemeRequest.emit(event);
  }

}
