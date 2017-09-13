import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface DragData {
  tag: string;
  data: any;
}

@Injectable()
export class DragDropService {
  private _dragData = new BehaviorSubject<DragData>(null);

  constructor() { }

  public setDragData(data: DragData): void
  {
    this._dragData.next(data);
  }

  public getDragData(): Observable<DragData>
  {
    return this._dragData.asObservable();
  }

  public clearDragData(): void
  {
    this._dragData.next(null);
  }

}
