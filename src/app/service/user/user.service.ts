import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/of';

import { User } from '../../domain';
import { Project } from '../../domain';

@Injectable()
export class UserService {
  private url = this.config.url;
  private domain = 'users';
  private headers = new Headers({'content-type': 'application/json'});

  constructor(private http: Http, @Inject('APP_CONFIG') private config) { }

  public searchUsers(keywords: string): Observable<User>
  {
    const url = `${this.url}/${this.domain}`;
    let params = new URLSearchParams();
    params.append('email_like', keywords);
    return this.http
      .get(url, {params: params})
      .map((res: Response) => res.json());
  }

  public searchUsersByProject(projectId: string): Observable<User[]>
  {
    const url = `${this.url}/${this.domain}`;
    let params = new URLSearchParams();
    params.append('projectId', projectId);
    return this.http
      .get(url, {params: params})
      .map((res: Response) => res.json());
  }

  public addProjectRef(user: User, projectId: string): Observable<User>
  {
    const url = `${this.url}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];

    if (user.projectIds.indexOf(projectId) !== -1) {
      return Observable.of(user);
    }

    return this.http
      .patch(url, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  public removeProjectRef(user: User, projectId: string): Observable<User>
  {
    const url = `${this.url}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);

    if (index === -1) {
      return Observable.of(user);
    }
    const update = {
      projectIds: [...projectIds.slice(0, index), ...projectIds.slice(index + 1)]
    };
    return this.http
    .patch(url, JSON.stringify(update), {headers: this.headers})
    .map((res: Response) => res.json());
  }

  public batchUpdateProejctRef(project: Project): Observable<User[]>
  {
    const projectId = project.id;
    const memberIds = project.memberIds ? project.memberIds : [];

    return Observable.from(memberIds)
      .mergeMap(userId => { // 老师用的是 switchMap
        const url = `${this.url}/${this.domain}/${userId}`;
        return this.http.get(url).map((res: Response) => res.json());
      })
      .filter(user => user.projectIds.indexOf(projectId) === -1)
      .switchMap(user => this.addProjectRef(user, projectId))
      .reduce((arr, curr) => [...arr, curr], []);
  }

}
