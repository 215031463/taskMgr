import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(
    @Inject(MD_DIALOG_DATA) private dialogData,
    private oc: OverlayContainer,
    private dialogRef: MdDialogRef<NewProjectComponent>
  ) { }

  ngOnInit() {
    console.log(this.dialogData.msg);
    this.oc.themeClass = this.dialogData.darkTheme ? 'my-dark-theme' : null;
  }

  public newProject(): void
  {
    this.dialogRef.close('msg from dialog...');
  }

}
