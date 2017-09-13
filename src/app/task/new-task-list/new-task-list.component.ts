import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskListComponent implements OnInit {
  public title: string;

  constructor(
    @Inject(MD_DIALOG_DATA) private dialogData,
    private dialogRef: MdDialogRef<NewTaskListComponent>
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
  }

  public onSaveClick(): void
  {
    const name = '乱取的'
    this.dialogRef.close(name);
  }

}
