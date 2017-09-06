import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';

import { Project } from '@domain/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public projects: Array<Project> = [];
  private dialogRef: MdDialogRef<NewProjectComponent>;

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
    this.projects = [
      {
        name: '项目一',
        desc: '项目一的描述内容',
        imgURL: './assets/img/covers/0.jpg'
      },
      {
        name: '项目二',
        desc: '项目二的描述内容',
        imgURL: './assets/img/covers/1.jpg'
      },
      {
        name: '项目三',
        desc: '项目三的描述内容',
        imgURL: './assets/img/covers/2.jpg'
      }
    ];
  }

  public openNewProjectDialog(): void {
    this.dialogRef = this.dialog.open(NewProjectComponent, { data: { msg: 'hello dialog...', darkTheme: true } });
    this.dialogRef.afterClosed()
      .subscribe(
      data => {
        if (data) {
          console.log(data);
        }
      }
      );
  }

}
