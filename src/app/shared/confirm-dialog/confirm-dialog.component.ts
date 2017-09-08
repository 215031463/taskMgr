import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div>
      <h3 md-dialog-title>{{ title }}</h3>
      <div md-dialog-content>{{ content }}</div>
      <div md-dialog-actions>
        <button (click)="onClick(true)" md-raised-button color="primary" type="button">确定</button>
        <button (click)="onClick(false)" md-button type="button">取消</button>
      </div>
    </div>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {
  public title: string;
  public content: string;

  constructor(
    @Inject(MD_DIALOG_DATA) private dialogData,
    private dialogRef: MdDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
    this.title = this.dialogData.title;
    this.content = this.dialogData.content;
  }

  public onClick(result: boolean): void
  {
    this.dialogRef.close(!!result);
  }

}
