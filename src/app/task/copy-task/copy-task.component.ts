import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyTaskComponent implements OnInit {
  public lists: Array<any>;
  public targetList: number;

  constructor(
    @Inject(MD_DIALOG_DATA) private dialogData,
    private dialogRef: MdDialogRef<CopyTaskComponent>
  ) { }

  ngOnInit() {
    this.lists = this.dialogData.lists;
  }

  public onMoveClick(): void
  {
    this.dialogRef.close(this.targetList);
  }

}
