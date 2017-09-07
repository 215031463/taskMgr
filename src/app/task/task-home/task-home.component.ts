import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from './../copy-task/copy-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {
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

  private newTaskDialogRef: MdDialogRef<NewTaskComponent>;
  private copyTaskDialogRef: MdDialogRef<CopyTaskComponent>;

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  public openNewTaskDialog(id: number | string): void {
    this.newTaskDialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        id: +id
      }
    });
    this.responseNewTaskDialog();
  }

  public responseNewTaskDialog(): void {
    this.newTaskDialogRef.afterClosed()
      .subscribe(data => {
        console.log(data);
      });
  }

  public openCopyTaskDialog(): void {
    // console.log('=================', 'in task-home');
    const dialogRef = this.dialog.open(CopyTaskComponent, {
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

}
