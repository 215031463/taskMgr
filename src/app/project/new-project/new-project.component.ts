import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(
    private dialogRef: MdDialogRef<any>,
    @Inject(MD_DIALOG_DATA) private dialogData
  ) { }

  ngOnInit() {
    console.log(this.dialogData.msg);
  }

  public newProject(): void
  {
    this.dialogRef.close('msg from dialog...');
  }

}
