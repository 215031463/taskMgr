import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef, OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  public title: string;
  public form: FormGroup;
  public coverImgs: string[] = [];

  constructor(
    @Inject(MD_DIALOG_DATA) private dialogData,
    private fb: FormBuilder,
    private dialogRef: MdDialogRef<NewProjectComponent>
  ) { }

  ngOnInit() {
    this.coverImgs = this.dialogData.thumbnails;
    this.buildForm();
  }

  private buildForm(): void
  {
    let project = this.dialogData.project;
    if (project) {
      this.form = this.fb.group({
        name: [project.name, Validators.required],
        desc: [project.desc],
        coverImg: [this.dialogData.coverImg]
      });
      this.title = '修改项目';
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [''],
        coverImg: [this.dialogData.coverImg]
      });
      this.title = '新建项目';
    }
  }

  public onSubmit({value}): void
  {
    this.dialogRef.close(value);
  }

}
