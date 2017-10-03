import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';

import { TaskList } from '../../domain/task-list.model';
import { Task } from '../../domain/task.model';

@Injectable()
export class TaskService {
  private readonly url = this.config.url;
  private readonly domain = 'task';
  private headers = new Headers({'content-type': 'application/json'});

  constructor(
    private http: Http,
    @Inject('APP_CONFIG') private config) { }

  public add(task: Task): Observable<Task>
  {
    task.id = null;
    const url = `${this.url}/${this.domain}`;
    return this.http
      .post(url, JSON.stringify({task: task}), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public delete(task: Task): Observable<Task>
  {
    const url = `${this.url}/${this.domain}/${task.id}`;
    return this.http
      .delete(url)
      .mapTo(task);
  }

  public update(task: Task): Observable<Task>
  {
    const url = `${this.url}/${this.domain}/${task.id}`;
    const patchValue = {
      desc: task.desc,
      priority: task.priority,
      dueDate: task.dueDate,
      reminder: task.reminde,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      remark: task.remark
    };
    return this.http
      .patch(url, JSON.stringify(patchValue), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public get(listId: string): Observable<Task[]>
  {
    const url = `${this.url}/${this.domain}`;
    const params = new URLSearchParams();
    params.append('listId', listId);
    return this.http
      .get(url, {params: params})
      .map((res: Response) => res.json());
  }

  public getByLists(lists: TaskList[]): Observable<Task[]>
  {
    const url = `${this.url}/${this.domain}`;
    return Observable.from(lists)
      .mergeMap(list => this.get(list.id))
      .reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []);
  }

  public complete(task: Task): Observable<Task>
  {
    const url = `${this.url}/${this.domain}/${task.id}`;
    return this.http
      .patch(url, JSON.stringify({completed: !task.completed}), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public move(taskId: string, listId: string): Observable<Task>
  {
    const url = `${this.url}/${this.domain}/${taskId}`;
    return this.http
      .patch(url, JSON.stringify({taskListId: listId}), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public moveAll(srcListId: string, targetListId: string): Observable<Task[]>
  {
    return this.get(srcListId)
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap(task => this.move(task.id, targetListId))
      .reduce((tasks, task) => [...tasks, task], []);
  }

}
