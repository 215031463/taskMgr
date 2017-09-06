import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() item;

  constructor() { }

  ngOnInit() {
    console.log(this.item.completed);
    console.log(this.item.owner.avatar);
  }

  public get avatar(): string
  {
    return this.item ? this.item.owner.avatar  : 'unassigned';
  }

  public get priorityClass(): { [key: string]: boolean }
  {
    return {
      'priority-normal': this.item.priority === 3,
      'priority-important': this.item.priority === 2,
      'priority-emergency': this.item.priority === 1
    };
  }

}
