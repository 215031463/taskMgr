import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public day: string;

  constructor() { }

  ngOnInit() {
    this.day = `day${new Date().getDate()}`;
  }

}
