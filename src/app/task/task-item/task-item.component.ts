import { Component, OnInit, Input, HostListener } from '@angular/core';

import { itemAnim } from '@animations/item.animations';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [ itemAnim ]
})
export class TaskItemComponent implements OnInit {
  @Input() item;

  public widthState = 'out';

  @HostListener('mouseenter')
  onMouseenter() {
    this.widthState = 'hover';
  }

  @HostListener('mouseleave')
  onmouseleave() {
    this.widthState = 'out';
  }

  constructor() { }

  ngOnInit() {
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

  public onCheckboxClick(ev: Event): void
  {
    ev.stopPropagation();
  }

}
