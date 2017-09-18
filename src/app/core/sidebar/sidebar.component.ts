import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() sideNavClick: EventEmitter<void> = new EventEmitter<void>();
  public day: string;

  constructor() { }

  ngOnInit() {
    this.day = `day${new Date().getDate()}`;
    console.log(this.day);
  }

  public onNavClick(): void
  {
    this.sideNavClick.emit();
  }

}
