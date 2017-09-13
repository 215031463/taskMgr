import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[appDraggable]'
})
export class DragDirective {
  private _isDraggable = false;

  @Input('appDraggable')
  set isDraggable (val: boolean) {
    this._isDraggable = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }

  get isDraggable (): boolean {
    return this._isDraggable;
  }

  @Input() dragStartClass: string;
  @Input() dragTag: string;
  @Input() dragData: any;

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private dds: DragDropService) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.dragStartClass);
      this.dds.setDragData({ tag: this.dragTag, data: this.dragData  });
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.dragStartClass);
    }
  }

}
