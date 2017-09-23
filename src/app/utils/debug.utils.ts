import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...any) => Observable<T>;
  }
}

Observable.prototype.debug = function(messages: string) {
  return this.do(
  (next) => {
    if (!environment.production) {
      console.log(next);
    }
  },
  (err) => {
    if (!environment.production) {
      console.error('ERROR >> ', err);
    }
  },
  () => {
    if (!environment.production) {
      console.log('completed...');
    }
  }
  );
};
