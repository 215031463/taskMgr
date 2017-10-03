import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quote/quote.service';
import { ProjectService } from './project/project.service';
import { TaskListService } from './task-list/task-list.service';
import { TaskService } from './task/task.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    QuoteService,
    ProjectService,
    TaskListService,
    TaskService,
    UserService,
    AuthService,
    AuthGuard
  ]
})
export class ServiceModule { }
