import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
  @Input() listId: number;
  @Input() headerName = '';
  @Output() newTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() copyTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() editTaskListRequest: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteTaskListRequest: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  public onNewTaskClick(): void
  {
    let id = this.listId ? +this.listId : 1;
    this.newTask.emit(id);
  }

  public onCopyTaskClick(): void
  {
    // console.log('++++++++++++++', 'in task-header');
    this.copyTask.emit(this.listId);
  }

  public onEditTaskListClick(): void
  {
    this.editTaskListRequest.emit();
  }

  public onDeleteTaskListClick(): void
  {
    this.deleteTaskListRequest.emit();
  }

}
