import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/reduce';

import { TaskList } from '../../domain/task-list.model';

@Injectable()
export class TaskListService {
  private readonly url = this.config.url;
  private readonly domain = 'task-lists';
  private headers = new Headers({'content-type': 'application/json'});

  constructor(
    private http: Http,
    @Inject('APP_CONFIG') private config) { }

  public get(projectId: string): Observable<TaskList[]>
  {
    const url = `${this.url}/${this.domain}`;
    let params = new URLSearchParams();
    params.append(projectId, projectId);
    return this.http.get(url, {params: params})
      .map((res: Response) => res.json() as TaskList[]);
  }

  public add(taskList: TaskList): Observable<TaskList>
  {
    taskList.id = null;
    const url = `${this.url}/${this.domain}`;
    return this.http.post(url, JSON.stringify(taskList), {headers: this.headers})
      .map((res: Response) => res.json() as TaskList);
  }

  public update(taskList: TaskList): Observable<TaskList>
  {
    const url = `${this.url}/${this.domain}/${taskList.id}`;
    const updateContent = {
      name: taskList.name
    };
    return this.http.patch(url, JSON.stringify(updateContent), {headers: this.headers})
      .map((res: Response) => res.json() as TaskList);
  }

  public delete(taskList: TaskList): Observable<TaskList>
  {
    const url = `${this.url}/${this.domain}/${taskList.id}`;
    return this.http.delete(url)
      .mapTo(taskList);
  }

  public exchangePosition(src: TaskList, target: TaskList): Observable<TaskList[]>
  {
    const srcURL = `${this.url}/${this.domain}/${src.id}`;
    const targetURL = `${this.url}/${this.domain}/${target.id}`;

    const src$ = this.http
      .patch(srcURL, JSON.stringify({order: target.order}), {headers: this.headers})
      .map((res: Response) => res.json());
    const target$ = this.http
      .patch(targetURL, JSON.stringify({order: src.order}), {headers: this.headers})
      .map((res: Response) => res.json());

    return Observable.concat(src$, target$).reduce((listArr, list) => [...listArr, list], []);
  }

}
