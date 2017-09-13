import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';

import { cardAnim } from '@animations/card.animations';
import { Project } from '@domain/project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [ cardAnim ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {
  @Input() project: Project;
  @Output() inviteRequest: EventEmitter<number> = new EventEmitter<number>();
  @Output() editRequest: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteRequest: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('@card') cardState = 'out';
  @HostListener('mouseenter')
  onMouseenter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseleave() {
    this.cardState = 'out';
  }

  constructor() { }

  ngOnInit() {
  }

  public inviteClick(): void
  {
    this.inviteRequest.emit(this.project.id);
  }

  public onEditBtnClick(): void
  {
    this.editRequest.emit();
  }

  public onDeleteBtnClick(): void
  {
    this.deleteRequest.emit();
  }

}
