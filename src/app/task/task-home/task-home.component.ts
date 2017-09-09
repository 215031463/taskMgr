import { Component, OnInit, HostBinding } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from './../copy-task/copy-task.component';
import { NewTaskListComponent } from './../new-task-list/new-task-list.component';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { routeAnim } from '@animations/route.animations';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [ routeAnim ]
})
export class TaskHomeComponent implements OnInit {
  private waitingDeleteListId: number;
  public lists = [
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克买一杯咖啡',
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: '张帆',
            avatar: 'avatars:svg-11'
          },
          reminder: true,
          dueDate: new Date()
        },
        {
          id: 2,
          desc: '任务二：与二建张总商谈材料订购的事宜',
          completed: false,
          priority: 1,
          owner: {
            id: 2,
            name: '李黄',
            avatar: 'avatars:svg-12'
          },
          reminder: true,
          dueDate: new Date()
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      tasks: [
        {
          id: 1,
          desc: '任务一：制作机电设备推广方案',
          owner: {
            id: 1,
            name: '王金文',
            avatar: 'avatars:svg-13'
          },
          completed: false,
          priority: 1,
          reminder: true,
          dueDate: new Date()
        },
        {
          id: 2,
          desc: '任务二：选定周末聚餐地点',
          completed: true,
          priority: 3,
          owner: {
            id: 2,
            name: '胡帅',
            avatar: 'avatars:svg-14'
          },
          reminder: false,
          dueDate: new Date()
        }
      ]
    },
    {
      id: 3,
      name: '已完成',
      tasks: [
        {
          id: 1,
          desc: '任务一：完成本周销售统计',
          completed: true,
          priority: 2,
          owner: {
            id: 3,
            name: '张止东',
            avatar: 'avatars:svg-15'
          },
          reminder: true,
          dueDate: new Date()
        }
      ]
    }
  ];

  @HostBinding('@slideToRight') state;

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  public openNewTaskDialog(id: number | string): void {
    const dialogRef: MdDialogRef<NewTaskComponent> = this.dialog.open(NewTaskComponent, {
      data: {
        title: '新建任务',
        id: +id
      }
    });

    dialogRef.afterClosed()
      .subscribe(
      data => console.log(data)
      );
  }

  public openCopyTaskDialog(): void {
    // console.log('=================', 'in task-home');
    const dialogRef: MdDialogRef<CopyTaskComponent> = this.dialog.open(CopyTaskComponent, {
      data: {
        lists: this.lists
      }
    });

    dialogRef.afterClosed()
      .subscribe(
      data => {
        console.log(data);
      }
      );
  }

  public onItemClick(task): void
  {
    const dialogRef: MdDialogRef<NewTaskComponent> = this.dialog.open(NewTaskComponent, {
      data: {
        title: '修改任务',
        task: task
      }
    });
  }

  public onNewTaskListClick(): void
  {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '新建列表'
      }
    });

    dialogRef.afterClosed()
      .subscribe(data => {
        console.log(data);
      });
  }

  public editTaskListHandler(list): void
  {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: '修改列表',
        list: list
      }
    });
    dialogRef.afterClosed()
      .subscribe(
      data => {
        console.log(data);
      }
      );
  }

  public deleteTaskListHandler(list): void
  {
    this.waitingDeleteListId = list.id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '删除确认',
        content: '确认删除该任务列表吗？'
      }
    });
    dialogRef.afterClosed()
      .subscribe(data => {
        if (data) {
          this.lists.forEach((list, index, lists) => {
            if (list.id === this.waitingDeleteListId) {
              this.lists.splice(index, 1);
            }
          });
        }
      });
  }

}
