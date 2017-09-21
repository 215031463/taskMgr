import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Quote } from '../../domain/quote.model';

@Injectable()
export class QuoteService {

  constructor(
    private http: Http,
    @Inject('APP_CONFIG') private appConfig) { }

  public getQuote(): Observable<Quote>
  {
    let quoteNum = Math.floor(Math.random() * 10);
    let quoteURL = `${this.appConfig.url}/quotes/${quoteNum}`;

    return this.http.get(quoteURL)
      .map((res: Response) => res.json());
  }

}
