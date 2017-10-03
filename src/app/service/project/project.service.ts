import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/mapTo';

import { Project } from '../../domain';

@Injectable()
export class ProjectService {
  private readonly url = this.config.url;
  private readonly domain = 'projects';
  private headers: Headers = new Headers({
    'content-type': 'application/json'
  });

  constructor(private http: Http, @Inject('APP_CONFIG') private config) { }

  public get(userId: string): Observable<Project[]>
  {
    const url = `${this.url}/${this.domain}`;
    let params = new URLSearchParams();
    params.append('memberIds_like', userId);
    return this.http.get(url, {params})
      .map((res: Response) => res.json() as Array<Project>);
  }

  public update(project: Project): Observable<Project>
  {
    const url = `${this.url}/${this.domain}/${project.id}`;

    let toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    }

    return this.http.patch(url, toUpdate, {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public add(project: Project): Observable<Project>
  {
    project.id = null;
    const url = `${this.url}/${this.domain}`;
    const body = JSON.stringify(project);
    return this.http.post(url, body, {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public delete(project: Project): Observable<Project>
  {
    const delTasks$ = Observable.from(project.taskListIds ? project.taskListIds : [])
      .mergeMap((listId: string) => this.http.delete(`${this.url}/${this.domain}/taskLists/${listId}`))
      .count();

    return delTasks$
      .switchMap(_ => this.http.delete(`${this.url}/${this.domain}/${project.id}`))
      .mapTo(project);
  }

}
