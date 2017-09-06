import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  public priorities: Array<any>;

  constructor(
    private dialogRef: MdDialogRef<NewTaskComponent>,
    @Inject(MD_DIALOG_DATA) private dialogData
  ) { }

  ngOnInit() {
    this.initialPriorities();
  }

  private initialPriorities(): void
  {
    this.priorities = [
      { label: '紧急', value: 1 },
      { label: '重要', value: 2 },
      { label: '一般', value: 3 }
    ];
  }

  public onsave(): void
  {
    this.dialogRef.close(this.dialogData.id);
  }

}
