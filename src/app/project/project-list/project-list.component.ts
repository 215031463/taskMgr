import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';

import { routeAnim } from '@animations/route.animations';
import { listAnim } from '@animations/list.animations';
import { Project } from '@domain/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [ routeAnim, listAnim ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  public waitingDeleteProjectId: number;
  public projects: Array<Project> = [];

  @HostBinding('@slideToRight') state;

  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.projects = [
      {
        id: 1,
        name: '项目一',
        desc: '项目一的描述内容',
        imgURL: './assets/img/covers/0.jpg'
      },
      {
        id: 2,
        name: '项目二',
        desc: '项目二的描述内容',
        imgURL: './assets/img/covers/1.jpg'
      },
      /* {
        id: 3,
        name: '项目三',
        desc: '项目三的描述内容',
        imgURL: './assets/img/covers/3.jpg'
      },
      {
        id: 4,
        name: '项目四',
        desc: '项目四的描述内容',
        imgURL: './assets/img/covers/4.jpg'
      } */
    ];
  }

  public openNewProjectDialog(): void {
    const dialogRef: MdDialogRef<NewProjectComponent> = this.dialog.open(NewProjectComponent, {
      data: {
        title: '新建项目'
      }
    });
    dialogRef.afterClosed()
      .subscribe(
      data => {
        if (data) {
          this.projects = [...this.projects,
          {
            id: 5,
            name: '项目五',
            desc: '项目五的描述内容',
            imgURL: './assets/img/covers/5.jpg'
          },
          {
            id: 6,
            name: '项目六',
            desc: '项目六的描述内容',
            imgURL: './assets/img/covers/6.jpg'
          }
        ];
        this.cd.markForCheck();
        }
      }
      );
  }

  public invite(id?: number): void
  {
    const dialogRef: MdDialogRef<InviteComponent> = this.dialog.open(InviteComponent, {
      data: {
        darkTheme: true,
        id: id
      }
    });
    dialogRef.afterClosed()
      .subscribe(
      data => {
        // console.log(JSON.stringify(data));
      }
      );
  }

  public editRequestHandler(project): void
  {
    this.dialog.open(NewProjectComponent, {
      data: {
        title: '修改',
        project: project
      }
    });
  }

  public deleteRequestHandler(project): void
  {
    this.waitingDeleteProjectId = project.id;
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
      position: {
        top: '30px'
      },
      data: {
        title: '删除确认',
        content: `您确定删除 项目 ${project.name} 吗？`
      }
    });

    dialogRef.afterClosed()
      .subscribe(
      data => {
        if (data) {
          this.projects.forEach((project, index, projects) => {
            if (project.id === this.waitingDeleteProjectId) {
              projects.splice(index, 1);
            }
          });
        }
        this.cd.markForCheck();
      }
      );
  }

}
