import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User, Auth } from '../../domain';

@Injectable()
export class AuthService {
  private url = this.config.url;
  private domain = 'users';
  private headers = new Headers({'content-type': 'application/json'});
  private token = 'fdsafdaserafdasfdas';

  constructor(private http: Http, @Inject('APP_CONFIG') private config) { }

  public register(user: User): Observable<Auth>
  {
    user.id = null;
    const url = `${this.url}/${this.domain}`;
    let params = new URLSearchParams();
    params.append('email', user.email);

    return this.http
      .get(url, {params: params})
      .switchMap((res: Response) => {
        if (res.json().length > 0) {
          throw 'user registed';
        }
        return this.http
          .post(url, JSON.stringify(user), {headers: this.headers})
          .map((r: Response) => {
            return {token: this.token, user: r.json()};
          });
      });
  }

  public login(userName: string, password: string): Observable<Auth>
  {
    const url = `${this.url}/${this.domain}`;
    let params = new URLSearchParams();
    params.append('email', userName);
    params.append('password', password);
    return this.http
      .get(url, {params: params})
      .map((res: Response) => {
        if (res.json().length === 0) {
          throw 'userName or password not match';
        }
        return {
          token: this.token,
          user: res.json()[0]
        }
      });
  }

}
