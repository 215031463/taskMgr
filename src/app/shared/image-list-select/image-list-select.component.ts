import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  AbstractControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {
  @Input() title = '请选择';
  @Input() items: Array<string> = [];
  @Input() cols = 6;
  @Input() rowHeight = '64px';
  @Input() useSvgIcon = false;
  @Input() itemWidth = '80px';

  public selected: string;
  private propagateChange = (_: any) => {};

  constructor() { }

  writeValue(obj: any): void {
    this.selected = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  public onSelect(i): void
  {
    this.selected = this.items[i];
    this.propagateChange(this.selected);
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return this.selected ? null : {
      imageListSelect: {
        valid: false
      }
    }
  }

}
