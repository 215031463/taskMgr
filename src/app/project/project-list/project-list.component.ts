import { Component, OnInit, OnDestroy, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

import { ProjectService } from '../../service/project/project.service';
import { UserService } from '../../service/user/user.service';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';

import { routeAnim } from '@animations/route.animations';
import { listAnim } from '@animations/list.animations';
import { Project, User } from '../../domain';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [ routeAnim, listAnim ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public projects: Array<Project> = [];

  @HostBinding('@slideToRight') state;

  constructor(
    private dialog: MdDialog,
    private us: UserService,
    private ps: ProjectService,
    private cd: ChangeDetectorRef) { }


  ngOnInit() {
    this.sub = this.ps.get('1').subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private getThumbnails(): string[]
  {
    return _.range(0, 40)
      .map(num => `assets/img/covers/${num}_tn.jpg`);
  }

  private buildImgSrc(src: string): string
  {
    return src.indexOf('_') !== -1 ? src.split('_')[0] + '.jpg' : src;
  }

  public openNewProjectDialog(): void {
    const img = `assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef: MdDialogRef<NewProjectComponent> = this.dialog.open(NewProjectComponent, {
      data: {
        thumbnails: this.getThumbnails(),
        coverImg: img
      }
    });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(p => ({...p, coverImg: this.buildImgSrc(p.coverImg)}))
      .switchMap(project => this.ps.add(project))
      .subscribe(project => {
        this.projects.push(project);
        this.cd.markForCheck();
      });
  }

  public invite(p: Project): void
  {
    const dialogRef: MdDialogRef<InviteComponent> = this.dialog.open(InviteComponent, {
      data: {
        members: []
      }
    });
    dialogRef.afterClosed()
      .take(1)
      .filter(val => val)
      .map((users: User[]) => users.map(user => user.id))
      .switchMap((ids: string[]) => this.ps.addMemberIds(p, ids))
      .do((project: Project) => {
        const idx = this.projects.map(projectItem => projectItem.id).indexOf(project.id);
        this.projects.splice(idx, 1, project);
      })
      .switchMap((project: Project) => this.us.batchUpdateProejctRef(project))
      .subscribe((users: User[]) => {});
  }

  public editRequestHandler(project): void
  {
    const img = project.coverImg.indexOf('_tn') === -1 ? project.coverImg.split('\.jpg')[0] + '_tn.jpg' : project.coverImg;
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        thumbnails: this.getThumbnails(),
        project: project,
        coverImg: img
      }
    });

    dialogRef.afterClosed()
      .take(1)
      .filter(p => p)
      .map(p => ({...project, name: p.name, desc: p.desc, coverImg: this.buildImgSrc(p.coverImg)}))
      .switchMap(p => this.ps.update(p))
      .subscribe((p: Project) => {
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects.splice(index, 1, p);
        this.cd.markForCheck();
      })
  }

  public deleteRequestHandler(project): void
  {
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
      .take(1)
      .filter(result => result)
      .switchMap(() => this.ps.delete(project))
      .subscribe(() => {
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects.splice(index, 1);
      });
  }

  public trackById(index: number, project: Project): string
  {
    return project.id;
  }

}
