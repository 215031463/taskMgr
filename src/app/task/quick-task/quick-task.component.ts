import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
  @Output() quickTaskRequest: EventEmitter<string> = new EventEmitter();
  public desc: string;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('keyup.enter')
  public quickTaskClick(): void
  {
    if (!this.desc || this.desc.length === 0 || !this.desc.trim()) {
      return;
    }
    this.quickTaskRequest.emit(this.desc);
    this.desc = '';
  }

}
