import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/do';

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...any) => Observable<T>;
  }
}

Observable.prototype.debug = function(messages: string) {
  return this.do(
  (next) => {
    if (!environment.production) {
      console.log('messages', next);
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
